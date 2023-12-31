import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import Typography from "@mui/material/Typography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "assets/images/city-profile.jpg";
import { useAuth } from "auth-context/auth.context";
import { Link } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import GradeIcon from "@mui/icons-material/Grade";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Icon } from "@mui/material";
import CreateChapter from "../CreateChapter/index";
import StoryApi from "api/story";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; // Add the CircularProgress component

function StoriesShow() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    StoryApi.getOneStory(id)
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false when data is received
        console.log("Data received successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const { user } = useAuth();
  console.log(user);

  const rows = [
    { chapterNo: "", title: "", author: "", mergedOn: "" },

    // // Add more rows as needed
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // Sample data for the table

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const parts = timestamp.split("T"); // Split at the "T" character
    if (parts.length > 0) {
      return parts[0]; // Keep the part before "T"
    }
    return timestamp; // Return the original timestamp if "T" is not found
  };

  return (
    <>
      {user && user.token ? (
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            route: "/pages/authentication/sign-out",
            label: "logout",
            color: "default",
          }}
          transparent
          light
        />
      ) : (
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://appseed.us/product/material-kit/api-server-nodejs/react/",
            label: "download",
            color: "default",
          }}
          transparent
          light
        />
      )}
      <MKBox
        minHeight="60vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            {data && data.story && (
              <div>
                <MKTypography
                  variant="h1"
                  color="white"
                  sx={({ breakpoints, typography: { size } }) => ({
                    [breakpoints.down("md")]: {
                      fontSize: size["3xl"],
                    },
                  })}
                >
                  {data.story.title}
                </MKTypography>
                <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
                  by {data.story.authorId}
                </MKTypography>
                <MKButton
                  color="default"
                  sx={{ color: ({ palette: { dark } }) => dark.main }}
                  href={`/storyDetails/${data.story.id}/${data.story.prologue}`}
                >
                  Start Reading
                </MKButton>
              </div>
            )}
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 10,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <MKTypography
          variant="h4"
          sx={{ mb: 5 }}
          component="span"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid container item xs={12} lg={10} justifyContent="space-around">
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <BookIcon />
              </Icon>
              <span>Genre/s: {data.story?.genre}</span>
            </MKTypography>
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <FormatListBulletedIcon />
              </Icon>
              <span>{data.chapters?.length} Chapters</span>
            </MKTypography>
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <BookIcon />
              </Icon>
              <span>{data.story?.status}</span>
            </MKTypography>
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <GradeIcon />
              </Icon>
              <span>{data.story?.rating}</span>
            </MKTypography>
            <MKTypography variant="h4" component="span" display="flex" alignItems="center">
              <Icon>
                <BookIcon />
              </Icon>
              <span>{data.story && formatTimestamp(data.story?.timestamp)}</span>
            </MKTypography>
          </Grid>
        </MKTypography>
        <MKTypography
          display="flex"
          justifyContent="space-around"
          variant="h6"
          textTransform="capitalize"
          fontWeight="bold"
        >
          <MKTypography
            variant="h4"
            sx={{ mb: 5 }}
            component="span"
            display="flex"
            alignItems="center"
          >
            <Icon>
              <LibraryBooksIcon />
            </Icon>
            <span>Table of Contents</span>
          </MKTypography>
        </MKTypography>
        <Paper>
          {loading ? ( // Render the loading animation if loading is true
            <CircularProgress />
          ) : (
            <TableContainer>
              <Table>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    align="center"
                  >
                    Chapter
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    align="center"
                  >
                    Title
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    align="center"
                  >
                    Author
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                    align="center"
                  >
                    Merged On
                  </TableCell>
                </TableRow>

                <TableBody>
                  {data &&
                    data.chapters &&
                    data.story &&
                    data.chapters.map((chapter, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <Link to={`/stories/${chapter.title}/${chapter.id}`}>
                            {chapter.title}
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/authors/${chapter.author}`}>{chapter.userId}</Link>
                        </TableCell>
                        <TableCell align="center">{formatTimestamp(chapter.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={4} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Card>

      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" sx={{ marginBottom: 10 }}>
          Create Chapter
        </Typography>
      </Container>
      <CreateChapter />

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default StoriesShow;
