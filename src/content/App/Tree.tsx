import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles'
import React from "react";

const useStyles: any = makeStyles(() => ({
    root: {
        width: "100%",
        maxWidth: 360,
        // backgroundColor: theme.background.paper,
    },
    nested: {
        // padding: `0px ${theme.spacing(3)}px`,
    },
    listItem: {
        padding: 0,
    },
    listItemText: {
        flex: "0 1 auto",
    },
    body1: {
        fontWeight: "bold",
    },
    listIcon: {
        minWidth: "unset",
        color: "#ff6464",
    },
}));

type Props = {
    data: {
        [key: string]: any
    },
    length: number
}

const ShowBrackets = ({ data, length }: Props) => {
    const text = length > 1 ? "items" : "item";
    const brackets = Array.isArray(data) ? " [...]" : " {...}";
    return (
        <Typography component="span" variant="body2" color="textSecondary">
            {`${brackets} // ${length} ${text}`}
        </Typography>
    );
};

export default function Tree({
    data,
    length,
    parentName = "",
    onLeafClick = (text) => { },
}: Props & {
    parentName?: string,
    onLeafClick?(text: string): void
}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            {data && (
                <ListItem
                    button
                    onClick={handleClick}
                    classes={{ root: classes.listItem }}
                >
                    <ListItemIcon
                        key={Math.random() * 10}
                        classes={{ root: classes.listIcon }}
                    >
                        {open ? <ExpandMore /> : <ChevronRight />}
                    </ListItemIcon>
                    <ListItemText key={Math.random() * 10}>
                        <b>{parentName} </b>
                        {!open && <ShowBrackets data={data} length={length} />}
                    </ListItemText>
                </ListItem>
            )}
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
                style={{ paddingLeft: "30px" }}
            >
                <List component="div" style={{ padding: 0 }}>
                    {data &&
                        Object.keys(data).map((k, i) => {
                            return data[k] != null && typeof data[k] === "object" ? (
                                <Tree
                                    key={Math.random()}
                                    data={data[k]}
                                    parentName={Array.isArray(data) ? "" : k}
                                    length={Object.keys(data[k]).length}
                                    onLeafClick={onLeafClick}
                                />
                            ) : (
                                <>
                                    <ListItem button onDoubleClick={() => {
                                        onLeafClick(data[k] === null ? "null" : data[k].toString())
                                    }} className={classes.nested}>
                                        {!Array.isArray(data) ? (
                                            <ListItemText classes={{ root: classes.listItemText }}>
                                                {k} :
                                            </ListItemText>
                                        ) : (
                                            ""
                                        )}
                                        <ListItemText>
                                            {data[k] === null ? "null" : data[k].toString()}
                                        </ListItemText>
                                    </ListItem>
                                </>
                            );
                        })}
                </List>
            </Collapse>
        </>
    );
}
