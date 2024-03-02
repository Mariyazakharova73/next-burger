import { FC } from "react";
//import { iNotification } from "react-notifications-component";
import styles from "./NotificationContent.module.css";

interface IContentProps {
  id: string;
  notificationConfig: any;
}

export const InfoContent: FC<IContentProps> = ({ notificationConfig }) => {
  return (
    <div className={styles.containerSuccess}>
      <p className={styles.title}>Информация:</p>
      <p className={styles.text}>{notificationConfig?.message}</p>
    </div>
  );
};
