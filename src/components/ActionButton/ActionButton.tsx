import { ActionIcon, Tooltip } from "@mantine/core";
import { Icon } from "@tabler/icons-react";

type TActionButton = {
  tooltip?: string;
  icon: Icon;
  onClick: () => void;
  className?: string;
  iconColor?: string;
};
export function ActionButton({
  tooltip,
  icon: PageIcon,
  onClick,
  className,
  iconColor,
}: TActionButton) {
  return (
    <Tooltip label={tooltip ? tooltip : ""} withArrow>
      <ActionIcon
        variant="default"
        size={"lg"}
        radius={"md"}
        onClick={onClick}
        className={className}
      >
        {PageIcon && (
          <PageIcon
            size="1.375rem"
            stroke={1.5}
            color={iconColor && iconColor}
          />
        )}
      </ActionIcon>
    </Tooltip>
  );
}
