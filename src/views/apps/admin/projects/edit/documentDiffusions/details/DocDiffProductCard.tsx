import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  MenuItem,
  Typography,
} from "@mui/material";
import type { UseFormRegister, FieldError } from "react-hook-form";

import CustomTextField from "@core/components/mui/TextField";
import type { FormValidateDocDiffUpdateType } from "./schemaDocDiffEdit";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      overflowY: "auto" as const,
    },
    sx: {
      "::-webkit-scrollbar": { display: "none" },
      scrollbarWidth: "none",
    },
  },
};

const DocDiffProductCard = ({
  register,
  errors,
  productListData,
}: {
  register: UseFormRegister<FormValidateDocDiffUpdateType>;
  errors: {
    material_marche_id?: FieldError;
    current_variant_id?: FieldError;
  };
  productListData: any;
}) => {
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    if (productListData?.results) {
      setProducts(productListData.results);
    }
  }, [productListData]);

  return (
    <Card
      sx={{
        transition: "height 0.3s ease", // Smooth transition of height
        display: "flex", // Use flex layout
        flexDirection: "column", // Column layout to stack elements
      }}
    >
      <CardHeader title="Produits" />
      <CardContent
        sx={{
          flexGrow: 1, // Make CardContent grow to fill available space
          display: "flex", // Flex layout inside CardContent
          flexDirection: "column", // Column layout inside CardContent
        }}
      >
        <div className="flex flex-grow flex-col"></div>
        <div className="flex items-end gap-4">
          {/* Dropdown for Material Marche */}
          <CustomTextField
            select
            fullWidth
            label="Material Marche"
            defaultValue="" // No pre-selected material
            {...register("material_marche_id")} // Integrates with react-hook-form
            error={!!errors.material_marche_id}
            SelectProps={{
              MenuProps,
            }}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                <Typography>{product.name}</Typography>
              </MenuItem>
            ))}
          </CustomTextField>

          {/* Dropdown for Current Variant */}
          <CustomTextField
            select
            fullWidth
            label="Current Variant"
            defaultValue="" // No pre-selected variant
            {...register("current_variant_id")} // Integrates with react-hook-form
            error={!!errors.current_variant_id}
            SelectProps={{
              MenuProps,
            }}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                <Typography>{product.name}</Typography>
              </MenuItem>
            ))}
          </CustomTextField>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocDiffProductCard;
