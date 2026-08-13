export const company = {
  name: 'MindStocs Studio',
  tagline: 'Software & Digital Agency',
  positioning: 'Technology + Product Development + Digital Growth',
  shortDescription:
    'MindStocs Studio brings software engineering, product development and digital growth capabilities together under one studio.',
  description:
    'We design and develop software, SaaS products, trading systems and digital growth solutions built around real business requirements.',

  address: {
    line1: 'Shop No. 12 & 13, First Floor, Karol Plaza',
    line2: 'Road: Opp. Vruddhashram, Salaiwada, Sawantwadi',
    line3: 'Sindhudurg, Maharashtra – 416510',
    city: 'Sawantwadi',
    district: 'Sindhudurg',
    state: 'Maharashtra',
    country: 'India',
    pincode: '416510',
  },

  gst: '27ACIFM1188P1ZI',

  whatsapp: {
    number: '+91 90210 08698',
    link: 'https://api.whatsapp.com/send/?phone=919021008698&text&type=phone_number&app_absent=0',
  },

  social: {
    instagram: '', // Provide official URL when available
    linkedin: '', // Provide official URL when available
    whatsapp:
      'https://api.whatsapp.com/send/?phone=919021008698&text&type=phone_number&app_absent=0',
  },

  email: '', // Provide official email when available
  phone: '+91 90210 08698',
} as const;

export type Company = typeof company;
