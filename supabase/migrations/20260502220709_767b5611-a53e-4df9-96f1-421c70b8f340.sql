
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins see all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile + default role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Shipments
CREATE TABLE public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number TEXT NOT NULL UNIQUE,
  sender_name TEXT NOT NULL,
  sender_address TEXT,
  recipient_name TEXT NOT NULL,
  recipient_address TEXT,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  service_type TEXT NOT NULL DEFAULT 'sea',
  weight_kg NUMERIC,
  status TEXT NOT NULL DEFAULT 'pending',
  current_location TEXT,
  estimated_delivery DATE,
  cost_usd NUMERIC,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER shipments_updated BEFORE UPDATE ON public.shipments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Public can view shipments" ON public.shipments FOR SELECT USING (true);
CREATE POLICY "Admins insert shipments" ON public.shipments FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update shipments" ON public.shipments FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete shipments" ON public.shipments FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Shipment events
CREATE TABLE public.shipment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shipment_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_shipment_events_shipment ON public.shipment_events(shipment_id, occurred_at DESC);

CREATE POLICY "Public can view events" ON public.shipment_events FOR SELECT USING (true);
CREATE POLICY "Admins insert events" ON public.shipment_events FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update events" ON public.shipment_events FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete events" ON public.shipment_events FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.shipments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shipment_events;
