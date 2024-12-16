import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import { contactType } from './contactType'
import { serviceType } from './serviceType'
import { historyType } from "./historyType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, contactType, serviceType, historyType],
}
