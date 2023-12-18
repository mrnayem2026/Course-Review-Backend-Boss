class ApiQueryBuilder {
    public query: Record<string, unknown> = {};
  
    setPage(page?: number): ApiQueryBuilder {
      if (page !== undefined) {
        this.query.page = page;
      }
      return this;
    }
  
    setLimit(limit?: number): ApiQueryBuilder {
      if (limit !== undefined) {
        this.query.limit = limit;
      }
      return this;
    }
  
    setSortBy(sortBy?: string): ApiQueryBuilder {
      if (sortBy !== undefined) {
        this.query.sortBy = sortBy;
      }
      return this;
    }
  
    setSortOrder(sortOrder?: 'asc' | 'desc'): ApiQueryBuilder {
      if (sortOrder !== undefined) {
        this.query.sortOrder = sortOrder;
      }
      return this;
    }
  
    setPriceRange(minPrice?: number, maxPrice?: number): ApiQueryBuilder {
      if (minPrice !== undefined) {
        this.query.minPrice = minPrice;
      }
      if (maxPrice !== undefined) {
        this.query.maxPrice = maxPrice;
      }
      return this;
    }
  
    setTags(tags?: string): ApiQueryBuilder {
      if (tags !== undefined) {
        this.query.tags = tags;
      }
      return this;
    }
  
    setDateRange(startDate?: string, endDate?: string): ApiQueryBuilder {
      if (startDate !== undefined) {
        this.query.startDate = startDate;
      }
      if (endDate !== undefined) {
        this.query.endDate = endDate;
      }
      return this;
    }
  
    setLanguage(language?: string): ApiQueryBuilder {
      if (language !== undefined) {
        this.query.language = language;
      }
      return this;
    }
  
    setProvider(provider?: string): ApiQueryBuilder {
      if (provider !== undefined) {
        this.query.provider = provider;
      }
      return this;
    }
  
    setDurationInWeeks(durationInWeeks?: number): ApiQueryBuilder {
      if (durationInWeeks !== undefined) {
        this.query.durationInWeeks = durationInWeeks;
      }
      return this;
    }
  
    setLevel(level?: string): ApiQueryBuilder {
      if (level !== undefined) {
        this.query.level = level;
      }
      return this;
    }
  
    build(): Record<string, unknown> {
      return this.query;
    }
  }

export default ApiQueryBuilder;