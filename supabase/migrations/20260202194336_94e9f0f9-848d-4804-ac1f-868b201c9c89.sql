-- Create agents table
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  avatar TEXT,
  system_prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- Anyone can view agents
CREATE POLICY "Anyone can view agents"
ON public.agents FOR SELECT
USING (true);

-- Anyone can insert agents
CREATE POLICY "Anyone can insert agents"
ON public.agents FOR INSERT
WITH CHECK (true);

-- Anyone can update agents
CREATE POLICY "Anyone can update agents"
ON public.agents FOR UPDATE
USING (true);

-- Anyone can delete agents
CREATE POLICY "Anyone can delete agents"
ON public.agents FOR DELETE
USING (true);

-- Insert default declaw agent
INSERT INTO public.agents (id, name, description, system_prompt)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'declaw',
  'AI agent for the meme token economy',
  'You are declaw, an AI agent helping users explore and create meme tokens on Pump.fun.'
);

-- Add agent_id to deployed_tokens
ALTER TABLE public.deployed_tokens
ADD COLUMN agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL;

-- Set existing tokens to default declaw agent
UPDATE public.deployed_tokens
SET agent_id = '00000000-0000-0000-0000-000000000001'
WHERE agent_id IS NULL;