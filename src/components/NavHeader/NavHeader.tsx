import NavButton from "components/NavButton/NavButton";
import styles from "./NavHeader.module.css"
import BackUrl from "./icon_back.svg"
import classNames from "classnames";

export interface NavHeaderProps {
    className?: string;
    onReturn?: () => void;
}


export default function NavHeader({ className, onReturn }: NavHeaderProps) {
    return <div className={classNames(className, styles.navheader)}>
        <NavButton className={styles.button} name="account" icon={BackUrl} onClick={() => onReturn?.()} />
    </div>
}