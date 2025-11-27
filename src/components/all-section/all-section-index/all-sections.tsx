// all-section-index.tsx
import { defaultDataSection1, ISection1Data } from '../section-1/data';
import { defaultDataSection2, ISection2Data } from '../section-2/data';
import { defaultDataSection3, ISection3Data } from '../section-3/data';
import { defaultDataSection4, ISection4Data } from '../section-4/data';
import { defaultDataSection5, ISection5Data } from '../section-5/data';
import { defaultDataSection6, ISection6Data } from '../section-6/data';
import { defaultDataSection7, ISection7Data } from '../section-7/data';

import MutationSection1 from '../section-1/Mutation';
import MutationSection2 from '../section-2/Mutation';
import MutationSection3 from '../section-3/Mutation';
import MutationSection4 from '../section-4/Mutation';
import MutationSection5 from '../section-5/Mutation';
import MutationSection6 from '../section-6/Mutation';
import MutationSection7 from '../section-7/Mutation';

import QuerySection1 from '../section-1/Query';
import QuerySection2 from '../section-2/Query';
import QuerySection3 from '../section-3/Query';
import QuerySection4 from '../section-4/Query';
import QuerySection5 from '../section-5/Query';
import QuerySection6 from '../section-6/Query';
import QuerySection7 from '../section-7/Query';

export type { ISection1Data, ISection2Data, ISection3Data, ISection4Data, ISection5Data, ISection6Data, ISection7Data };

export const AllSections = {
  'section-uid-1': { mutation: MutationSection1, query: QuerySection1, data: defaultDataSection1 },
  'section-uid-2': { mutation: MutationSection2, query: QuerySection2, data: defaultDataSection2 },
  'section-uid-3': { mutation: MutationSection3, query: QuerySection3, data: defaultDataSection3 },
  'section-uid-4': { mutation: MutationSection4, query: QuerySection4, data: defaultDataSection4 },
  'section-uid-5': { mutation: MutationSection5, query: QuerySection5, data: defaultDataSection5 },
  'section-uid-6': { mutation: MutationSection6, query: QuerySection6, data: defaultDataSection6 },
  'section-uid-7': { mutation: MutationSection7, query: QuerySection7, data: defaultDataSection7 },
};

export const AllSectionsKeys = Object.keys(AllSections);
