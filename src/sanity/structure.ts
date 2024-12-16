import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('contact').title('Contact'),
      S.documentTypeListItem('service').title('Service'),
      S.documentTypeListItem('history').title('History'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['contact', 'service', 'history'].includes(item.getId()!),
      ),
    ])
