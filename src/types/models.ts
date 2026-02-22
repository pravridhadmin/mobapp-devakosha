export interface ApiMeta {
  total_count: number;
}

export interface State {
  id: number;
  meta: {
    type: string;
    detail_url: string;
  };
  title: string;
}

export interface StateResponse {
  meta: ApiMeta;
  items: State[];
}

export interface District {
  id: number;
  meta: {
    type: string;
    detail_url: string;
  };
  title: string;
  state: State
}

export interface DistrictResponse {
  meta: ApiMeta;
  items: District[];
}

export interface TemplePage {
  id: number;
  meta: PageMeta;
  title: string;

  address_line1: string;
  address_line2: string;
  address_line3: string;

  city: string;
  state: State;
  district: District;

  postal_code: string | null;
  description: string;

  latitude: number;
  longitude: number;

  built_year: string;
  category: string[];

  contact_number: string | null;
  contact_email: string | null;

  featured_image: Image[];
  images: Image[];

  is_featured: boolean;

  morning_start: string | null;
  morning_end: string | null;
  evening_start: string | null;
  evening_end: string | null;

  last_published_at: string; // ISO date string
}

export interface PageMeta {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: string; // ISO date string
  alias_of: string | null;
  locale: string;
}

export interface Image {
  url: string;
}