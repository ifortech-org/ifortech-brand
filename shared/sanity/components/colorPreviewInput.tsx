"use client";

import React from "react";
import { Box, Card, Flex, Stack, Text } from "@sanity/ui";
import type { StringInputProps } from "sanity";

function isValidColor(value?: string) {
  if (!value) return false;
  if (typeof window === "undefined" || typeof window.CSS === "undefined") {
    return /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);
  }
  return window.CSS.supports("color", value);
}

export default function ColorPreviewInput(props: StringInputProps) {
  const value = typeof props.value === "string" ? props.value : "";
  const valid = isValidColor(value);

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
            background: valid ? value : "transparent",
            backgroundImage: valid
              ? undefined
              : "linear-gradient(45deg, transparent 40%, #f03 40%, #f03 60%, transparent 60%)",
          }}
        />
        <Box flex={1}>
          <Text size={1}>
            {valid ? value : value ? "Valore colore non valido" : "Anteprima colore"}
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
}
