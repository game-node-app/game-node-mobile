import React, { PropsWithChildren } from "react";
import GameSelectViewContent from "@/components/game/view/select/GameSelectViewContent";
import GameSelectActions from "@/components/game/view/select/GameSelectActions";

interface GameSelectViewProps extends PropsWithChildren {}

const GameSelectView = ({ children }: GameSelectViewProps) => {
    return <>{children}</>;
};

GameSelectView.Content = GameSelectViewContent;
GameSelectView.Actions = GameSelectActions;

export default GameSelectView;
