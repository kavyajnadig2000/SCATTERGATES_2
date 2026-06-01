/**
 * Represent core data structures for the Scattergates corporate platform.
 */

export interface ServiceDetail {
  title: string;
  points: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  imageUrl: string;
  items: ServiceDetail[];
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
  assessmentAnswers?: {[key: string]: string};
}
