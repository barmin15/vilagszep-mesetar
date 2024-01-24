import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//this component doesn't handle any logic, it is simply for render
export function StoryCardBox({
    story,
    setIsFullText,
    isFullText,
    onCopyText,
    isLiked,
    onLike
}) {

    //inserting elements into the vertual DOM
    return (
        <>
            <Box sx={{
                margin: "auto",
                width: {
                    xs: "90vw",
                    sm: "75vw",
                    md: "70vw"
                },
                marginTop: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#f9f9f9"
            }}>
                <Card sx={{
                    margin: "auto",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "#fff"
                }} variant="outlined">
                    <CardContent>
                    <Typography variant="h4" component="div" sx={{ fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 1 }}>
                    {story.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: "#555", fontStyle: "italic" }} color="text.secondary" gutterBottom>
                        {story.comment}
                    </Typography>
                        <Typography variant="body1" sx={{ textDecoration: "underline", mb: 1, fontSize: 18, color: "#60A1DA" }}>
                            {story.copyRight.replaceAll('_', ' ')}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, fontSize: 16, color: "#777" }}>
                            Forrás: <span style={{ fontSize: 17, fontWeight: "bold" }}>{story.source}</span>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, fontSize: 16, color: "#777" }}>
                            Korosztály: <span style={{ fontSize: 18, fontWeight: "bold" }}>{story.ageGroup.replaceAll('_', ' ')}</span>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, fontSize: 16, color: "#777" }}>
                            Származási hely (kontinens): <span style={{ fontSize: 18, fontWeight: "bold" }}>{story.continent.replaceAll('_', ' ')}</span>
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, fontSize: 16, color: "#777" }}>
                            Kulcsszavak: {story.keyWords.map(keyWord => (
                                <Typography key={keyWord.element} sx={{ paddingLeft: 4, display: "inline-block", backgroundColor: "#f0f0f0", borderRadius: "8px", padding: "4px 8px", marginRight: "4px", fontSize: 14 }}>
                                    {keyWord.element}
                                </Typography>
                            ))}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, fontSize: 16, color: "#777" }}>
                            Mesetarisznyák: {story.storyBags.map(storyBag => (
                                <Typography key={storyBag.element} sx={{ paddingLeft: 4, display: "inline-block", backgroundColor: "#f0f0f0", borderRadius: "8px", padding: "4px 8px", marginRight: "4px", fontSize: 14 }}>
                                    {storyBag.element}
                                </Typography>
                            ))}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={e => setIsFullText(!isFullText)} sx={{ color: "#60A1DA", fontWeight: "bold" }}>
                            {isFullText ? "Teljes mese elrejtése" : "Teljes mese megjelenítése"}
                        </Button>
                        <Button size="small" onClick={onCopyText} sx={{ color: "#60A1DA", fontWeight: "bold" }}>
                            Szöveg másolása
                        </Button>
                        {isLiked ? (
                            <FavoriteIcon onClick={onLike} sx={{ color: "#e53935", "&:hover": { cursor: "pointer" } }} />
                        ) : (
                            <FavoriteBorderIcon onClick={onLike} sx={{ "&:hover": { cursor: "pointer" } }} />
                        )}
                    </CardActions>
                </Card>


            </Box>
            {isFullText && (
                <>
                    <Typography sx={{
                        paddingTop: 5,
                        fontSize: 28,
                        paddingBottom: 2,
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>{story.title}</Typography>
                    <Typography sx={{
                        width: { xs: "85%", sm: "70%" },
                        textAlign: "left",
                        margin: "auto",
                        fontSize: {
                            xs: 17,
                            sm: 16
                        },
                        paddingBottom: 15
                    }}>{story.text}</Typography>
                </>
            )}
        </>
    );
}
