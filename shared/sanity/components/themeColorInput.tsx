"use client";

import React from "react";
import { set, unset, type StringInputProps } from "sanity";
import { Box, Button, Card, Flex, Grid, Stack, Text } from "@sanity/ui";
import { THEME_COLOR_OPTIONS, isThemeColorToken, resolveThemeColorValue } from "@/shared/lib/theme-colors";

function isValidColor(value?: string) {
  if (!value) return false;
  if (isThemeColorToken(value)) return true;
  if (typeof window === "undefined" || typeof window.CSS === "undefined") {
    return /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);
  }
  return window.CSS.supports("color", value);
}

export default function ThemeColorInput(props: StringInputProps) {
  const value = typeof props.value === "string" ? props.value : "";
  const valid = isValidColor(value);

  const applyValue = (nextValue: string) => {
    props.onChange(nextValue ? set(nextValue) : unset());
  };

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Flex align="center" gap={3}>
        <Card
          radius={2}
          border
          style={{
            width: 24,
            height: 24,
            background: valid ? resolveThemeColorValue(value) : "transparent",
            backgroundImage: valid
              ? undefined
              : "linear-gradient(45deg, transparent 40%, #f03 40%, #f03 60%, transparent 60%)",
          }}
        />
        <Box flex={1}>
          <Text size={1}>
            {valid
              ? isThemeColorToken(value)
                ? `Colore tema: ${value}`
                : value
              : value
                ? "Valore colore non valido"
                : "Suggerimenti tema o codice colore libero"}
          </Text>
        </Box>
      </Flex>
      <Text size={1}>
        Usa un token del tema oppure un valore CSS come `#000000`, `rgb(...)` o `hsl(...)`.
      </Text>
      <Grid columns={[2, 2, 3]} gap={2}>
        {THEME_COLOR_OPTIONS.map((option) => (
          <Button
            key={option.value}
            mode={value === option.value ? "default" : "ghost"}
            text={option.title}
            onClick={() => applyValue(option.value)}
          />
        ))}
      </Grid>
    </Stack>
  );
}
