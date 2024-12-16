import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const historyType = defineType({
  name: 'history',
  title: 'History',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
        name: 'email',
        title: 'Email',
        type: 'string',
      }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
    }),
  ],
});
