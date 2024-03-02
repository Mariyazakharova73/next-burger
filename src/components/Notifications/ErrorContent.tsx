import { FC } from "react";
//import { iNotification } from "react-notifications-component";
import styles from "./NotificationContent.module.css";

interface IContentProps {
  notificationConfig: any;
}

export const ErrorContent: FC<IContentProps> = ({ notificationConfig }) => {
  return (
    <div className={styles.containerError}>
      <p className={styles.title}>Ошибка!</p>
      <p className={styles.text}>{notificationConfig.message}</p>
    </div>
  );
};
