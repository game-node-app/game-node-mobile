import React, { SetStateAction, useContext } from "react";
import { ActionIcon, Divider, Group, Tooltip } from "@mantine/core";
import { IconLayoutColumns, IconLayoutList } from "@tabler/icons-react";
import { GameViewContext } from "@/components/game/view/GameView";
import { IonSegment, IonSegmentButton } from "@ionic/react";

export type GameViewLayoutOption = "grid" | "list";

interface IGameViewLayoutSwitcherProps {
    setLayout: React.Dispatch<SetStateAction<GameViewLayoutOption>>;
}

const GameViewLayoutSwitcher = ({ setLayout }: IGameViewLayoutSwitcherProps) => {
    const { layout } = useContext(GameViewContext);

    const handleLayoutChange = (changeTo: GameViewLayoutOption) => {
        setLayout(changeTo);
    };

    return (
        <IonSegment value={layout}>
            <IonSegmentButton value={"grid"} onClick={() => handleLayoutChange("grid")}>
                <IconLayoutColumns />
            </IonSegmentButton>
            <IonSegmentButton value={"list"} onClick={() => handleLayoutChange("list")}>
                <IconLayoutList />
            </IonSegmentButton>
        </IonSegment>
    );
};

export default GameViewLayoutSwitcher;
