import styles from './Sitemap.module.scss';
import {useRouter} from "next/navigation";

type Menu = {
  link: string;
  name: string;
}

interface Props {
  dataMenus: {
    children: Menu[];
    link: string
    name: string;
  }[];
  close: () => void;
}

export default function Sitemap({dataMenus, close}: Props) {

  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollArea}>
        <div className={styles.menuGrid}>
          {dataMenus?.map((i: any) => (
            <div key={i.name} className={styles.menuGroup}>
              <div className={styles.menuGroupTitle}>{i.name}</div>
              {i.children?.length > 0 && (
                <div className={styles.subMenuGrid}>
                  {i.children.map((j: any) => (
                    <div key={j.name}>
                      <div className={styles.subMenuItem}>{j.name}</div>
                      {j.children?.map((k: any) => (
                        <div
                          key={k.name}
                          className={styles.subSubMenuItem}
                          onClick={() => {
                            close();
                            router.push(k.link);
                          }}
                        >
                          <div style={{width: '100%'}}>{k.name}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button onClick={close} className={styles.closeButton}>
          <span className={styles.closeButtonText}>닫기</span>
        </button>
      </div>
    </div>
  )
}