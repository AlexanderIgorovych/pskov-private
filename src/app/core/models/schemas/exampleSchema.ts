import { schema } from 'normalizr';

const show = new schema.Entity('shows');

export const ShowSchema = { shows: [show] };
