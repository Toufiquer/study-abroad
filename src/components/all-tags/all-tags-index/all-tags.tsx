import { IButton1Data, defaultDataButton1 } from '../tags-1/data';
import { IButton2Data, defaultDataButton2 } from '../tags-2/data';
import { ITitleData, defaultDataTitle } from '../tags-3/data';
import { IDescriptionData, defaultDataDescription } from '../tags-4/data';
import { IParagraphData, defaultDataParagraph } from '../tags-5/data';
import { IImagesData, defaultDataImages } from '../tags-6/data';
import { ISlideItem, defaultDataSlider } from '../tags-7/data';
import { ITagItem, defaultDataTagSlider } from '../tags-8/data';
import { ILogoData, defaultDataLogo } from '../tags-9/data';
import { IGalleryData, defaultDataGallery } from '../tags-10/data';

import MutationButton1 from '../tags-1/Mutation';
import MutationButton2 from '../tags-2/Mutation';
import MutationTitle3 from '../tags-3/Mutation';
import MutationDescription4 from '../tags-4/Mutation';
import MutationParagraph5 from '../tags-5/Mutation';
import MutationImage6 from '../tags-6/Mutation';
import MutationSlide7 from '../tags-7/Mutation';
import MutationTag8 from '../tags-8/Mutation';
import MutationLogo9 from '../tags-9/Mutation';
import MutationGallery10 from '../tags-10/Mutation';

import QueryButton1 from '../tags-1/Query';
import QueryButton2 from '../tags-2/Query';
import QueryButton3 from '../tags-3/Query';
import QueryDescription4 from '../tags-4/Query';
import QueryParagraph5 from '../tags-5/Query';
import QueryImaes6 from '../tags-6/Query';
import QuerySlide7 from '../tags-7/Query';
import QueryTag8 from '../tags-8/Query';
import QueryLogo9 from '../tags-9/Query';
import QueryGallery10 from '../tags-10/Query';

export type { IButton1Data, IButton2Data, ITitleData, IDescriptionData, IParagraphData, IImagesData, ISlideItem, ITagItem, ILogoData, IGalleryData };

export const AllTags = {
  'button-uid-1': { mutation: MutationButton1, query: QueryButton1, data: defaultDataButton1 },
  'button-uid-2': { mutation: MutationButton2, query: QueryButton2, data: defaultDataButton2 },
  'title-uid-3': { mutation: MutationTitle3, query: QueryButton3, data: defaultDataTitle },
  'description-uid-4': { mutation: MutationDescription4, query: QueryDescription4, data: defaultDataDescription },
  'paragraph-uid-5': { mutation: MutationParagraph5, query: QueryParagraph5, data: defaultDataParagraph },
  'images-uid-6': { mutation: MutationImage6, query: QueryImaes6, data: defaultDataImages },
  'slide-uid-7': { mutation: MutationSlide7, query: QuerySlide7, data: defaultDataSlider },
  'tags-uid-8': { mutation: MutationTag8, query: QueryTag8, data: defaultDataTagSlider },
  'logo-uid-9': { mutation: MutationLogo9, query: QueryLogo9, data: defaultDataLogo },
  'gallery-uid-10': { mutation: MutationGallery10, query: QueryGallery10, data: defaultDataGallery },
};

export const AllTagsKeys = Object.keys(AllTags);
