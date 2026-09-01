import { useState, type ElementType, type ReactNode } from "react";
import { IconCheck, IconClose, IconPin } from "@/components/Icons";
import { useSite } from "@/lib/site-context";

type EditableProps = {
  contentKey: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  children?: (value: string) => ReactNode;
};

/**
 * Renders a translated / admin-overridden string. In admin mode a pin button
 * appears next to it, allowing inline editing of the current language value.
 */
export function Editable({
  contentKey,
  as: Tag = "span",
  className,
  multiline = false,
  children,
}: EditableProps) {
  const { t, adminMode, setDraft, lang } = useSite();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const current = t(contentKey);

  if (!adminMode) {
    return <Tag className={className}>{children ? children(current) : current}</Tag>;
  }

  if (editing) {
    const Field = multiline ? "textarea" : "input";
    return (
      <span className="inline-flex w-full flex-col gap-2 align-top">
        <Field
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
          rows={multiline ? 4 : undefined}
          className="w-full rounded-md border border-primary bg-popover px-3 py-2 font-sans text-sm text-foreground outline-none"
        />
        <span className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setDraft(`${contentKey}@${lang}`, value);
              setEditing(false);
            }}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground"
          >
            <IconCheck className="h-3.5 w-3.5" /> OK
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
          >
            <IconClose className="h-3.5 w-3.5" />
          </button>
        </span>
      </span>
    );
  }

  return (
    <Tag className={`${className ?? ""} relative`}>
      {children ? children(current) : current}
      <button
        type="button"
        title={t("admin_edit_label")}
        onClick={() => {
          setValue(current);
          setEditing(true);
        }}
        className="mx-1.5 inline-flex h-5 w-5 translate-y-0.5 items-center justify-center rounded border border-primary bg-primary-soft align-middle text-primary"
      >
        <IconPin className="h-3 w-3" />
      </button>
    </Tag>
  );
}
