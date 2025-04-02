// components/CustomToast.jsx
import { motion as MotionDiv, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const emojiMap = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
  loading: "👀",
};

function CustomToast({ t, type = "info", message = "" }) {
  const emoji = emojiMap[type] || "🔔";

  return (
    <AnimatePresence>
      {t.visible && (
        <MotionDiv.div
          initial={{ opacity: 0, y: -20 }} // از بالا + محو
          animate={{ opacity: 1, y: 0 }} // به جای اصلیش میاد + کامل دیده میشه
          exit={{ opacity: 0, y: -20 }} // دوباره برمی‌گرده بالا + محو میشه
          transition={{ duration: 0.3 }}
          style={{
            background: "white",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "400px",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontSize: "20px" }}>{emoji}</span>
          <span style={{ flex: 1 }}>{message}</span>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "18px",
              color: "#999",
              cursor: "pointer",
              alignSelf: "start",
            }}
          >
            &times;
          </button>
        </MotionDiv.div>
      )}
    </AnimatePresence>
  );
}

export default CustomToast;
