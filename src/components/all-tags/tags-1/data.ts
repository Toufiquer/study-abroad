export interface Button1Props {
  data?: IButton1Data | string;
}

export interface IButton1Data {
  buttonName: string;
  buttonIcon: string;
  buttonPath: string;
  isNewTab: boolean;
}

export const defaultDataButton1: IButton1Data = {
  buttonName: 'View Guidelines',
  buttonIcon: 'doc-icon',
  buttonPath: '/guidelines/student-guidenes',
  isNewTab: true,
};
