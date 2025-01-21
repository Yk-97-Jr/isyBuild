"use client";

// MUI Imports
import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import type { ProductRead } from "@/services/IsyBuildApi";

const ProductDisplay = ({ docDiffData }: { docDiffData?: ProductRead }) => {
  // Hooks
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card className="bs-full" sx={{ height: 400 }}>
      <CardContent>
        <div
          className="flex max-sm:flex-col items-center gap-6"
          style={{ height: "100%" }}
        >
          {/* Left Side: Product Information */}
          <div className="flex flex-col justify-between gap-2 is-full sm:is-6/12">
            <Typography variant="h4">
              Nom du produit:{" "}
              {docDiffData ? docDiffData.name : "Select a Product"}
            </Typography>
            <Typography
              className="font-medium"
              style={{
                maxHeight: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {docDiffData
                ? docDiffData.description
                : "Product description will be displayed here."}
            </Typography>
            {/* Render additional product details if available */}
            {docDiffData && (
              <>
                <Typography variant="body2" noWrap>
                  Category: {docDiffData.category.name}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    wordWrap: "break-word",

                    overflow: "hidden",
                    textOverflow: "revert-layer",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Technical Sheet:{" "}
                  {docDiffData.technical_sheet
                    ? docDiffData.technical_sheet
                    : "N/A"}
                </Typography>
              </>
            )}
          </div>
          <Divider
            orientation={isSmallScreen ? "horizontal" : "vertical"}
            flexItem
          />
          {/* Right Side: Product Image Gallery */}
          <div
            className="flex flex-col gap-3 is-full sm:is-6/12"
            style={{ height: "100%" }}
          >
            {docDiffData && docDiffData.media.length > 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ImageList
                    cols={1}
                    rowHeight={200}
                    style={{
                      height: "100%",
                      maxHeight: 200,
                      overflowY: "auto",
                    }}
                  >
                    {docDiffData.media.map((item, index) => (
                      <ImageListItem key={index}>
                        <img src={item.image} alt={`Image ${item.id}`} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </Grid>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDisplay;
