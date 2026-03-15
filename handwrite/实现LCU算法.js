class LCUCache {
  /**
   * @param {number} capacity 缓存容量
   * @param {Function} costFunction 成本计算函数：参数为 { value, ...costProps }，返回成本数值（越小越优先淘汰）
   */
  constructor(capacity, costFunction) {
    this.capacity = capacity;
    this.costFunction = costFunction;
    this.cache = new Map(); // 缓存 key -> { value, ...costProps, lastAccessTime}
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const entry = this.cache.get(key);
    entry.lastAccessTime = Date.now();
    return entry.value;
  }

  /**
   * 存入缓存数据
   * @param {any} key
   * @param {any} value
   * @param {any} costProps 成本相关属性（如 loadCost、weight、expireTime 等）
   */
  put(key, value, costProps) {
    if (!this.capacity) {
      return;
    }

    // key 已存在，更新value和属性
    if (this.cache.has(key)) {
      const entry = {
        value,
        ...costProps,
        lastAccessTime: Date.now()
      };
      this.cache.set(key, entry);
      return;
    }

    // 容量满了，删除成本最低的key
    if (this.cache.size >= this.capacity) {
      let minCost = null;
      let minCostKey = null;

      for (const [key, entry] of this.cache) {
        const cost = this.costFunction(entry);
        if (cost < minCost) {
          minCost = cost;
          minCostKey = key;
        }
      }

      if (minCostKey !== null) {
        this.cache.delete(minCostKey);
      }
    }

    // 添加新key
    this.cache.set(key, {
      value,
      ...costProps,
      lastAccessTime: Date.now()
    });
  }
}
