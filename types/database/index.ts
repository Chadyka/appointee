/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/subscriptions": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.subscriptions.id"];
          created_at?: parameters["rowFilter.subscriptions.created_at"];
          updated_at?: parameters["rowFilter.subscriptions.updated_at"];
          paid_at?: parameters["rowFilter.subscriptions.paid_at"];
          reference?: parameters["rowFilter.subscriptions.reference"];
          type?: parameters["rowFilter.subscriptions.type"];
          price?: parameters["rowFilter.subscriptions.price"];
          discount?: parameters["rowFilter.subscriptions.discount"];
          discount_amount?: parameters["rowFilter.subscriptions.discount_amount"];
          organization_id?: parameters["rowFilter.subscriptions.organization_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["subscriptions"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** subscriptions */
          subscriptions?: definitions["subscriptions"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.subscriptions.id"];
          created_at?: parameters["rowFilter.subscriptions.created_at"];
          updated_at?: parameters["rowFilter.subscriptions.updated_at"];
          paid_at?: parameters["rowFilter.subscriptions.paid_at"];
          reference?: parameters["rowFilter.subscriptions.reference"];
          type?: parameters["rowFilter.subscriptions.type"];
          price?: parameters["rowFilter.subscriptions.price"];
          discount?: parameters["rowFilter.subscriptions.discount"];
          discount_amount?: parameters["rowFilter.subscriptions.discount_amount"];
          organization_id?: parameters["rowFilter.subscriptions.organization_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.subscriptions.id"];
          created_at?: parameters["rowFilter.subscriptions.created_at"];
          updated_at?: parameters["rowFilter.subscriptions.updated_at"];
          paid_at?: parameters["rowFilter.subscriptions.paid_at"];
          reference?: parameters["rowFilter.subscriptions.reference"];
          type?: parameters["rowFilter.subscriptions.type"];
          price?: parameters["rowFilter.subscriptions.price"];
          discount?: parameters["rowFilter.subscriptions.discount"];
          discount_amount?: parameters["rowFilter.subscriptions.discount_amount"];
          organization_id?: parameters["rowFilter.subscriptions.organization_id"];
        };
        body: {
          /** subscriptions */
          subscriptions?: definitions["subscriptions"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/services": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.services.id"];
          created_at?: parameters["rowFilter.services.created_at"];
          updated_at?: parameters["rowFilter.services.updated_at"];
          name?: parameters["rowFilter.services.name"];
          price?: parameters["rowFilter.services.price"];
          discount?: parameters["rowFilter.services.discount"];
          discount_amount?: parameters["rowFilter.services.discount_amount"];
          organization_id?: parameters["rowFilter.services.organization_id"];
          provider_id?: parameters["rowFilter.services.provider_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["services"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** services */
          services?: definitions["services"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.services.id"];
          created_at?: parameters["rowFilter.services.created_at"];
          updated_at?: parameters["rowFilter.services.updated_at"];
          name?: parameters["rowFilter.services.name"];
          price?: parameters["rowFilter.services.price"];
          discount?: parameters["rowFilter.services.discount"];
          discount_amount?: parameters["rowFilter.services.discount_amount"];
          organization_id?: parameters["rowFilter.services.organization_id"];
          provider_id?: parameters["rowFilter.services.provider_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.services.id"];
          created_at?: parameters["rowFilter.services.created_at"];
          updated_at?: parameters["rowFilter.services.updated_at"];
          name?: parameters["rowFilter.services.name"];
          price?: parameters["rowFilter.services.price"];
          discount?: parameters["rowFilter.services.discount"];
          discount_amount?: parameters["rowFilter.services.discount_amount"];
          organization_id?: parameters["rowFilter.services.organization_id"];
          provider_id?: parameters["rowFilter.services.provider_id"];
        };
        body: {
          /** services */
          services?: definitions["services"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/providers": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.providers.id"];
          updated_at?: parameters["rowFilter.providers.updated_at"];
          avatar_url?: parameters["rowFilter.providers.avatar_url"];
          first_name?: parameters["rowFilter.providers.first_name"];
          last_name?: parameters["rowFilter.providers.last_name"];
          full_name?: parameters["rowFilter.providers.full_name"];
          email?: parameters["rowFilter.providers.email"];
          phone?: parameters["rowFilter.providers.phone"];
          organization_id?: parameters["rowFilter.providers.organization_id"];
          service_id?: parameters["rowFilter.providers.service_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["providers"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** providers */
          providers?: definitions["providers"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.providers.id"];
          updated_at?: parameters["rowFilter.providers.updated_at"];
          avatar_url?: parameters["rowFilter.providers.avatar_url"];
          first_name?: parameters["rowFilter.providers.first_name"];
          last_name?: parameters["rowFilter.providers.last_name"];
          full_name?: parameters["rowFilter.providers.full_name"];
          email?: parameters["rowFilter.providers.email"];
          phone?: parameters["rowFilter.providers.phone"];
          organization_id?: parameters["rowFilter.providers.organization_id"];
          service_id?: parameters["rowFilter.providers.service_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.providers.id"];
          updated_at?: parameters["rowFilter.providers.updated_at"];
          avatar_url?: parameters["rowFilter.providers.avatar_url"];
          first_name?: parameters["rowFilter.providers.first_name"];
          last_name?: parameters["rowFilter.providers.last_name"];
          full_name?: parameters["rowFilter.providers.full_name"];
          email?: parameters["rowFilter.providers.email"];
          phone?: parameters["rowFilter.providers.phone"];
          organization_id?: parameters["rowFilter.providers.organization_id"];
          service_id?: parameters["rowFilter.providers.service_id"];
        };
        body: {
          /** providers */
          providers?: definitions["providers"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          first_name?: parameters["rowFilter.profiles.first_name"];
          last_name?: parameters["rowFilter.profiles.last_name"];
          full_name?: parameters["rowFilter.profiles.full_name"];
          email?: parameters["rowFilter.profiles.email"];
          phone?: parameters["rowFilter.profiles.phone"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          first_name?: parameters["rowFilter.profiles.first_name"];
          last_name?: parameters["rowFilter.profiles.last_name"];
          full_name?: parameters["rowFilter.profiles.full_name"];
          email?: parameters["rowFilter.profiles.email"];
          phone?: parameters["rowFilter.profiles.phone"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          first_name?: parameters["rowFilter.profiles.first_name"];
          last_name?: parameters["rowFilter.profiles.last_name"];
          full_name?: parameters["rowFilter.profiles.full_name"];
          email?: parameters["rowFilter.profiles.email"];
          phone?: parameters["rowFilter.profiles.phone"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/organizations": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.organizations.id"];
          created_at?: parameters["rowFilter.organizations.created_at"];
          updated_at?: parameters["rowFilter.organizations.updated_at"];
          name?: parameters["rowFilter.organizations.name"];
          legal_name?: parameters["rowFilter.organizations.legal_name"];
          billing_address?: parameters["rowFilter.organizations.billing_address"];
          email?: parameters["rowFilter.organizations.email"];
          phone?: parameters["rowFilter.organizations.phone"];
          contact_id?: parameters["rowFilter.organizations.contact_id"];
          avatar_url?: parameters["rowFilter.organizations.avatar_url"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["organizations"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** organizations */
          organizations?: definitions["organizations"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.organizations.id"];
          created_at?: parameters["rowFilter.organizations.created_at"];
          updated_at?: parameters["rowFilter.organizations.updated_at"];
          name?: parameters["rowFilter.organizations.name"];
          legal_name?: parameters["rowFilter.organizations.legal_name"];
          billing_address?: parameters["rowFilter.organizations.billing_address"];
          email?: parameters["rowFilter.organizations.email"];
          phone?: parameters["rowFilter.organizations.phone"];
          contact_id?: parameters["rowFilter.organizations.contact_id"];
          avatar_url?: parameters["rowFilter.organizations.avatar_url"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.organizations.id"];
          created_at?: parameters["rowFilter.organizations.created_at"];
          updated_at?: parameters["rowFilter.organizations.updated_at"];
          name?: parameters["rowFilter.organizations.name"];
          legal_name?: parameters["rowFilter.organizations.legal_name"];
          billing_address?: parameters["rowFilter.organizations.billing_address"];
          email?: parameters["rowFilter.organizations.email"];
          phone?: parameters["rowFilter.organizations.phone"];
          contact_id?: parameters["rowFilter.organizations.contact_id"];
          avatar_url?: parameters["rowFilter.organizations.avatar_url"];
        };
        body: {
          /** organizations */
          organizations?: definitions["organizations"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  subscriptions: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    updated_at?: string;
    /** Format: timestamp with time zone */
    paid_at?: string;
    /** Format: text */
    reference?: string;
    /** Format: text */
    type?: string;
    /** Format: real */
    price?: number;
    /** Format: text */
    discount?: string;
    /** Format: real */
    discount_amount?: number;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `organizations.id`.<fk table='organizations' column='id'/>
     */
    organization_id?: string;
  };
  services: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    updated_at?: string;
    /** Format: text */
    name?: string;
    /** Format: real */
    price?: number;
    /** Format: text */
    discount?: string;
    /** Format: real */
    discount_amount?: number;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `organizations.id`.<fk table='organizations' column='id'/>
     */
    organization_id?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `providers.id`.<fk table='providers' column='id'/>
     */
    provider_id?: string;
  };
  providers: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: text */
    avatar_url?: string;
    /** Format: text */
    first_name?: string;
    /** Format: text */
    last_name?: string;
    /** Format: text */
    full_name?: string;
    /** Format: text */
    email?: string;
    /** Format: text */
    phone?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `organizations.id`.<fk table='organizations' column='id'/>
     */
    organization_id?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `services.id`.<fk table='services' column='id'/>
     */
    service_id?: string;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: text */
    username?: string;
    /** Format: text */
    avatar_url?: string;
    /** Format: text */
    website?: string;
    /** Format: text */
    first_name?: string;
    /** Format: text */
    last_name?: string;
    /** Format: text */
    full_name?: string;
    /** Format: text */
    email?: string;
    /** Format: text */
    phone?: string;
  };
  organizations: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    updated_at?: string;
    /** Format: text */
    name?: string;
    /** Format: text */
    legal_name?: string;
    /** Format: text */
    billing_address?: string;
    /** Format: text */
    email?: string;
    /** Format: text */
    phone?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    contact_id?: string;
    /** Format: text */
    avatar_url?: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description subscriptions */
  "body.subscriptions": definitions["subscriptions"];
  /** Format: uuid */
  "rowFilter.subscriptions.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.subscriptions.created_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.subscriptions.updated_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.subscriptions.paid_at": string;
  /** Format: text */
  "rowFilter.subscriptions.reference": string;
  /** Format: text */
  "rowFilter.subscriptions.type": string;
  /** Format: real */
  "rowFilter.subscriptions.price": string;
  /** Format: text */
  "rowFilter.subscriptions.discount": string;
  /** Format: real */
  "rowFilter.subscriptions.discount_amount": string;
  /** Format: uuid */
  "rowFilter.subscriptions.organization_id": string;
  /** @description services */
  "body.services": definitions["services"];
  /** Format: uuid */
  "rowFilter.services.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.services.created_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.services.updated_at": string;
  /** Format: text */
  "rowFilter.services.name": string;
  /** Format: real */
  "rowFilter.services.price": string;
  /** Format: text */
  "rowFilter.services.discount": string;
  /** Format: real */
  "rowFilter.services.discount_amount": string;
  /** Format: uuid */
  "rowFilter.services.organization_id": string;
  /** Format: uuid */
  "rowFilter.services.provider_id": string;
  /** @description providers */
  "body.providers": definitions["providers"];
  /** Format: uuid */
  "rowFilter.providers.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.providers.updated_at": string;
  /** Format: text */
  "rowFilter.providers.avatar_url": string;
  /** Format: text */
  "rowFilter.providers.first_name": string;
  /** Format: text */
  "rowFilter.providers.last_name": string;
  /** Format: text */
  "rowFilter.providers.full_name": string;
  /** Format: text */
  "rowFilter.providers.email": string;
  /** Format: text */
  "rowFilter.providers.phone": string;
  /** Format: uuid */
  "rowFilter.providers.organization_id": string;
  /** Format: uuid */
  "rowFilter.providers.service_id": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string;
  /** Format: text */
  "rowFilter.profiles.username": string;
  /** Format: text */
  "rowFilter.profiles.avatar_url": string;
  /** Format: text */
  "rowFilter.profiles.website": string;
  /** Format: text */
  "rowFilter.profiles.first_name": string;
  /** Format: text */
  "rowFilter.profiles.last_name": string;
  /** Format: text */
  "rowFilter.profiles.full_name": string;
  /** Format: text */
  "rowFilter.profiles.email": string;
  /** Format: text */
  "rowFilter.profiles.phone": string;
  /** @description organizations */
  "body.organizations": definitions["organizations"];
  /** Format: uuid */
  "rowFilter.organizations.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.organizations.created_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.organizations.updated_at": string;
  /** Format: text */
  "rowFilter.organizations.name": string;
  /** Format: text */
  "rowFilter.organizations.legal_name": string;
  /** Format: text */
  "rowFilter.organizations.billing_address": string;
  /** Format: text */
  "rowFilter.organizations.email": string;
  /** Format: text */
  "rowFilter.organizations.phone": string;
  /** Format: uuid */
  "rowFilter.organizations.contact_id": string;
  /** Format: text */
  "rowFilter.organizations.avatar_url": string;
}

export interface operations {}

export interface external {}