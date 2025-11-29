export interface ISection9Data {
  id: string;
  title: string;
  buttonText: string;
}

export interface Section9Props {
  data?: ISection9Data | string;
}

export const defaultDataSection9: ISection9Data = {
  id: 'Section 9 Button Text',
  title: 'Be The Next Story',
  buttonText: 'Apply Now',
};
