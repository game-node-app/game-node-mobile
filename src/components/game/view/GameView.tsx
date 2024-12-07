import React, { createContext, PropsWithChildren } from "react";
import GameViewContent from "@/components/game/view/GameViewContent";
import GameViewLayoutSwitcher from "@/components/game/view/GameViewLayoutSwitcher";

export type GameViewLayoutOption = "grid" | "list";

export type GameViewLoadMoreMode = "button" | "scroll";

interface IGameViewProps extends PropsWithChildren {
    layout: GameViewLayoutOption;
    /**
     * Mode to be used to fetch more content.
     * 'button' renders a Load More button.
     * 'scroll' uses infinite scroll.
     */
    loadMoreMode?: GameViewLoadMoreMode;
}

type IGameViewContext = Pick<IGameViewProps, "layout" | "loadMoreMode">;

export const GameViewContext = createContext<IGameViewContext>({
    layout: "grid",
    loadMoreMode: "button",
});

/**
 * Component responsible for rendering a list or grid of games.
 * Related components should be used to provide the necessary functionality (e.g. layout selector, pagination).
 * @param children
 * @param layout
 * @param loadMoreMode
 * @constructor
 *
 */
const GameView = ({ children, layout = "grid", loadMoreMode = "button" }: IGameViewProps) => {
    return (
        <GameViewContext.Provider value={{ layout: layout, loadMoreMode: loadMoreMode }}>
            {children}
        </GameViewContext.Provider>
    );
};

GameView.Content = GameViewContent;
GameView.LayoutSwitcher = GameViewLayoutSwitcher;

export default GameView;
