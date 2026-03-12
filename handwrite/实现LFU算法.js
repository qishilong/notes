/**
 * LFU(Least Frequently Used, 最不经常使用)
 * 是和 LRU 齐名、工业界最常并列对比的经典缓存淘汰算法，名称结构和 LRU 完全对应，仅核心判断维度不同。
 * 核心逻辑：以访问频次为核心，缓存容量满时，优先淘汰「历史访问次数最少」的数据，而非 LRU 关注的「最久未被访问」的数据。
 * 和 LRU 的核心区别：LRU 看「最近有没有用」，LFU 看「用的次数多不多」。
 * 例：一个数据很久没访问，但历史总访问量极高，LRU 会优先淘汰它，LFU 则会优先保留。
 */
class LFUCache {
  /**
   * 构造函数
   * @param {number} capacity 最大缓存容量
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.lfuCache = new Map(); // 存储 key -> {value, frequency}
    this.frequencyMap = new Map(); // 存储 frequency -> Set<key>(利用Set的插入顺序处理同频次下的key)
    this.minFrequency = 0;
  }

  /**
   * 获取缓存数据
   * @param {any} key - 缓存键
   * @return {any} - 缓存值，不存在返回-1
   */
  get(key) {
    if (!this.lfuCache.has(key)) {
      return -1;
    }

    const { value, frequency } = this.lfuCache.get(key);

    // 1. 从旧频次集合中移除key
    const frequencySet = this.frequencyMap.get(frequency);
    frequencySet.delete(key);
    if (frequencySet.size === 0) {
      this.frequencyMap.delete(key);
      // 若旧频次是最小频次，则更新最小频次
      if (this.minFrequency === frequency) {
        this.minFrequency++;
      }
    }

    // 2. 更新频次并加入新频次集合
    const newFrequency = frequency + 1;
    this.lfuCache.set(key, { value, frequency: newFrequency });

    if (!this.frequencyMap.has(newFrequency)) {
      this.frequencyMap.set(newFrequency, new Set());
    }
    this.frequencyMap.get(newFrequency).add(key);

    return value;
  }

  /**
   * 存入缓存数据
   * @param {any} key
   * @param {any} value
   */
  put(key, value) {
    if (!this.capacity) {
      return;
    }

    // 1. 若key存在，更新value并触发this.get更新频次
    if (this.lfuCache.has(key)) {
      this.lfuCache.get(key).value = value;
      this.get(key);
      return;
    }
    // 2. 若容量满了，删除最小频次中最久未使用的key
    if (this.lfuCache.size >= this.capacity) {
      const minFrequencySet = this.frequencyMap.get(this.minFrequency);

      const oldestKey = minFrequencySet.values().next().value;
      minFrequencySet.delete(oldestKey);

      if (minFrequencySet.size === 0) {
        this.frequencyMap.delete(this.minFrequency);
      }
      this.lfuCache.delete(oldestKey);
    }
    // 3. 添加新key，频次初始化为1
    this.lfuCache.set(key, { value, frequency: 1 });
    if (!this.frequencyMap.has(1)) {
      this.frequencyMap.set(1, new Set());
    }

    this.frequencyMap.get(1).add(key);
    this.minFrequency = 1; // 新key加入，最小频次重置为1
  }

  /**
   * 查看当前LFU缓存内容、频次分布、当前最小频次
   * @returns
   */
  check() {
    return {
      lfuCache: this.lfuCache,
      frequencyMap: this.frequencyMap,
      minFrequency: this.minFrequency
    };
  }
}

const lfu = new LFUCache(2);
lfu.put(1, 1); // 缓存: {1:1}
lfu.put(2, 2); // 缓存: {1:1, 2:2}
console.log(lfu.get(1)); // 返回1（1的频次变为2）
lfu.put(3, 3); // 容量满，淘汰频次最低的2，缓存: {1:1, 3:3}
console.log(lfu.get(2)); // 返回-1（2已被淘汰）
console.log(lfu.get(3)); // 返回3（3的频次变为2）
lfu.put(4, 4); // 容量满，淘汰同频次中最久的1，缓存: {3:3, 4:4}
console.log(lfu.get(1)); // 返回-1
console.dir(lfu.check(), { depth: null });
