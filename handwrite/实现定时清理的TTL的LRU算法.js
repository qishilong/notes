class TTLLRUCache {
  /**
   * @param {number} capacity 缓存容量
   * @param {number} [clearIntervalTime=60000] 定期清理间隔时间（毫秒），默认60秒
   */
  constructor(capacity, clearIntervalTime = 60000) {
    this.capacity = capacity;
    this.clearIntervalTime = clearIntervalTime;
    this.cache = new Map(); // 存储缓存数据，key -> { value, expireTime }

    this.clearTimer = setInterval(() => {
      this._clearExpired();
    }, clearIntervalTime);
  }

  get(key) {
    if (!this.cache.get(key)) {
      return -1;
    }

    const now = Date.now();

    const { value, expireTime } = this.cache.get(key);
    if (now > expireTime) {
      this.cache.delete(key);
      return -1;
    }

    // 未过期，更新LRU顺序（删除后重新插入到Map末尾）
    this.cache.delete(key);
    this.cache.set(key, {
      value,
      expireTime
    });

    return value;
  }

  /**
   * 缓存数据
   * @param {any} key
   * @param {any} value
   * @param {number} ttl 过期时间（毫秒）
   */
  put(key, value, ttl) {
    if (!key || typeof ttl !== 'number' || ttl <= 0) {
      return;
    }

    const now = Date.now();

    // 当前缓存中有key值
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      if (now > entry.expireTime) {
        this.cache.delete(key);
      }
    }

    // 容量满了，需要先删除最旧的，在保存到队尾
    if (this.cache.size > this.capacity) {
      const latestKey = this.cache.keys().next().value;
      this.cache.delete(latestKey);
    }

    // 存入新数据
    this.cache.set(key, {
      value,
      expireTime: now + ttl
    });
  }

  _clearExpired() {
    if (!this.cache.size) {
      return;
    }

    const now = Date.now();

    // 先收集所有key（避免遍历过程中删除元素导致的迭代问题）
    const keys = [...this.cache.keys()];

    for (const key of keys) {
      const entry = this.cache.get(key);
      if (now > entry.expireTime) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 销毁缓存，清除定时器，清除cache缓存，防止内存泄漏
   */
  destroy() {
    if (this.clearTimer) {
      clearInterval(this.clearTimer);
      this.clearTimer = null;
    }
    this.cache.clear();
  }
}

// 初始化：容量2，定期清理间隔1000毫秒（1秒，方便测试）
const cache = new TTLLRUCache(2, 1000);

// ---------------- 1. 演示惰性删除 ----------------
console.log('--- 惰性删除演示 ---');
cache.put(1, '数据1', 500); // 数据1：0.5秒后过期
console.log('get(1) 立即访问:', cache.get(1)); // 输出：数据1（未过期）

// 等待0.6秒，数据1过期
setTimeout(() => {
  console.log('get(1) 0.6秒后访问:', cache.get(1)); // 输出：-1（惰性删除触发）

  // ---------------- 2. 演示LRU淘汰 ----------------
  console.log('\n--- LRU淘汰演示 ---');
  cache.put(2, '数据2', 3000); // 数据2：3秒后过期
  cache.put(3, '数据3', 3000); // 数据3：3秒后过期（容量满，无淘汰，因为数据1已被删）
  console.log('get(2):', cache.get(2)); // 输出：数据2（数据2移到末尾，数据3在头部）

  cache.put(4, '数据4', 3000); // 容量满，淘汰头部的「最久未用」数据3
  console.log('get(3):', cache.get(3)); // 输出：-1（数据3被LRU淘汰）
  console.log('get(4):', cache.get(4)); // 输出：数据4

  // ---------------- 3. 演示定期清理 ----------------
  console.log('\n--- 定期清理演示 ---');
  // 等待2秒，定期清理会执行（但数据2、4还没过期）
  setTimeout(() => {
    console.log('2秒后 get(2):', cache.get(2)); // 输出：数据2
    console.log('2秒后 get(4):', cache.get(4)); // 输出：数据4

    // 再等待1.5秒，数据2、4过期，定期清理会批量删除
    setTimeout(() => {
      console.log('3.5秒后 get(2):', cache.get(2)); // 输出：-1（定期清理已删除）
      console.log('3.5秒后 get(4):', cache.get(4)); // 输出：-1（定期清理已删除）

      // 销毁缓存，防止内存泄漏
      cache.destroy();
      console.log('\n缓存已销毁');
    }, 1500);
  }, 2000);
}, 600);
