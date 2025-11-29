// all-section-index.tsx
import { defaultDataSection1 } from '../section-1/data';
import { defaultDataSection2 } from '../section-2/data';
import { defaultDataSection3 } from '../section-3/data';
import { defaultDataSection4 } from '../section-4/data';
import { defaultDataSection5 } from '../section-5/data';
import { defaultDataSection6 } from '../section-6/data';
import { defaultDataSection7 } from '../section-7/data';
import { defaultDataSection8 } from '../section-8/data';
import { defaultDataSection9 } from '../section-9/data';
import { defaultDataSection10 } from '../section-10/data';
import { defaultDataSection11 } from '../section-11/data';
import { defaultDataSection12 } from '../section-12/data';

import MutationSection1 from '../section-1/Mutation';
import MutationSection2 from '../section-2/Mutation';
import MutationSection3 from '../section-3/Mutation';
import MutationSection4 from '../section-4/Mutation';
import MutationSection5 from '../section-5/Mutation';
import MutationSection6 from '../section-6/Mutation';
import MutationSection7 from '../section-7/Mutation';
import MutationSection8 from '../section-8/Mutation';
import MutationSection9 from '../section-9/Mutation';
import MutationSection10 from '../section-10/Mutation';
import MutationSection11 from '../section-11/Mutation';
import MutationSection12 from '../section-12/Mutation';

import QuerySection1 from '../section-1/Query';
import QuerySection2 from '../section-2/Query';
import QuerySection3 from '../section-3/Query';
import QuerySection4 from '../section-4/Query';
import QuerySection5 from '../section-5/Query';
import QuerySection6 from '../section-6/Query';
import QuerySection7 from '../section-7/Query';
import QuerySection8 from '../section-8/Query';
import QuerySection9 from '../section-9/Query';
import QuerySection10 from '../section-10/Query';
import QuerySection11 from '../section-11/Query';
import QuerySection12 from '../section-12/Query';

export const AllSections = {
  'section-uid-1': { mutation: MutationSection1, query: QuerySection1, data: defaultDataSection1 },
  'section-uid-2': { mutation: MutationSection2, query: QuerySection2, data: defaultDataSection2 },
  'section-uid-3': { mutation: MutationSection3, query: QuerySection3, data: defaultDataSection3 },
  'section-uid-4': { mutation: MutationSection4, query: QuerySection4, data: defaultDataSection4 },
  'section-uid-5': { mutation: MutationSection5, query: QuerySection5, data: defaultDataSection5 },
  'section-uid-6': { mutation: MutationSection6, query: QuerySection6, data: defaultDataSection6 },
  'section-uid-7': { mutation: MutationSection7, query: QuerySection7, data: defaultDataSection7 },
  'section-uid-8': { mutation: MutationSection8, query: QuerySection8, data: defaultDataSection8 },
  'section-uid-9': { mutation: MutationSection9, query: QuerySection9, data: defaultDataSection9 },
  'section-uid-10': { mutation: MutationSection10, query: QuerySection10, data: defaultDataSection10 },
  'section-uid-11': { mutation: MutationSection11, query: QuerySection11, data: defaultDataSection11 },
  'section-uid-12': { mutation: MutationSection12, query: QuerySection12, data: defaultDataSection12 },
};

export const AllSectionsKeys = Object.keys(AllSections);
