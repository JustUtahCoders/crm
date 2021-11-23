import { IntakeItem, IntakeItemType } from "../CreateEditIntakeForm";
import { ViewIntakeField } from "./ViewIntakeField";
import { ViewIntakeParagraph } from "./ViewIntakeParagraph";
import { ViewIntakePage } from "./ViewIntakePage";

export function ViewIntakeItem(props: ViewIntakeItemProps) {
  const ViewItem = getViewItemComponent(props.intakeItem);

  return <ViewItem {...props} />;
}

function getViewItemComponent(
  intakeItem: IntakeItem
): React.FunctionComponent<ViewIntakeItemProps> {
  switch (intakeItem.type) {
    case IntakeItemType.Field:
      return ViewIntakeField;
    case IntakeItemType.Paragraph:
      return ViewIntakeParagraph;
    case IntakeItemType.Page:
      return ViewIntakePage;
    default:
      throw Error(
        `ViewIntakeItem not implemented for intake items with type '${intakeItem.type}'`
      );
  }
}

export interface ViewIntakeItemProps {
  intakeItem: IntakeItem;
  viewMode: IntakeViewMode;
}

export enum IntakeViewMode {
  createEdit = "createEdit",
  fillForm = "fillForm",
}
