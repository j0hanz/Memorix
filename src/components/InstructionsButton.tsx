import { Button } from "react-bootstrap";
import { handleButtonClick } from "@/utils/soundManager";
import styles from "@/App.module.css";

interface InstructionsButtonProps {
  onClick: () => void;
}

export default function InstructionsButton({
  onClick,
}: InstructionsButtonProps) {
  return (
    <Button onClick={handleButtonClick(onClick)} className={styles.btnGuide}>
      Guide
    </Button>
  );
}
