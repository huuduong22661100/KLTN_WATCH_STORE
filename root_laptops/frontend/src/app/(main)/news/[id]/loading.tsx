import styles from './loading.module.css';

export default function NewsDetailLoading() {
  return (
    <div className={styles.loadingPageWrapper}>
      <div className={styles.container}>
        <div className={styles.thumbnailSkeleton} />

        <div className={styles.contentContainer}>
          <div className={styles.titleSkeleton} />

          <div className={styles.metaSkeleton}>
            <div className={styles.metaItemSkeleton1} />
            <div className={styles.metaItemSkeleton2} />
            <div className={styles.metaItemSkeleton3} />
          </div>

          <div className={styles.textSkeletonGroup}>
            <div className={styles.textSkeletonFull} />
            <div className={styles.textSkeletonFull} />
            <div className={styles.textSkeleton5_6} />
            <div className={styles.textSkeletonFull} />
            <div className={styles.textSkeleton4_5} />
            <div className={styles.textSkeletonFull} />
            <div className={styles.textSkeleton3_4} />
          </div>
        </div>
      </div>
    </div>
  );
}
