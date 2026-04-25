import type { CollectionConfig } from 'payload'

export const ConsultationInquiries: CollectionConfig = {
  slug: 'consultation-inquiries',
  admin: {
    useAsTitle: 'sourcing',
    defaultColumns: ['sourcing', 'headache', 'source', 'createdAt'],
  },
  access: {
    // [!code ++] Public homepage form creates rows without auth; only admins can read in Payload admin.
    create: () => true,
    read: ({ req: { user } }) => user?.role === 'admin',
    update: () => false,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'sourcing',
      type: 'textarea',
      required: true,
      label: 'What are you sourcing?',
    },
    {
      name: 'headache',
      type: 'textarea',
      required: true,
      label: "What's your biggest headache right now?",
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'homepage',
    },
  ],
}
