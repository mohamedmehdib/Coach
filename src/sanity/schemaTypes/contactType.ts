import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'title',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'email',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'message',
      type: 'text',
    }),
  ],
});
