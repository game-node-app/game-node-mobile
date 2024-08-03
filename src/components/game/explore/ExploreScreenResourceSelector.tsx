import React, { useMemo } from "react";
import {
    ComboboxItem,
    LoadingOverlay,
    MultiSelect,
    MultiSelectProps,
    SelectProps,
} from "@mantine/core";
import { useGamesResource } from "@/components/game/hooks/useGamesResource";

interface Props extends MultiSelectProps {
    resourceName: string;
}

interface GameResource {
    id: number;
    name: string;
}

const ExploreScreenResourceSelector = ({ resourceName, ...others }: Props) => {
    const resourceQuery = useGamesResource<GameResource>(resourceName);
    const data = useMemo((): ComboboxItem[] | undefined => {
        if (resourceQuery.data == undefined) return undefined;
        return resourceQuery.data.map((resource) => {
            return {
                value: `${resource.id}`,
                label: resource.name,
            };
        });
    }, [resourceQuery.data]);
    return (
        <MultiSelect
            pos={"relative"}
            placeholder={resourceQuery.isLoading ? "Loading..." : undefined}
            data={data}
            searchable
            clearable
            {...others}
            maxValues={5}
        ></MultiSelect>
    );
};

export default ExploreScreenResourceSelector;
