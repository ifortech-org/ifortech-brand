"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Text, Flex, Badge, Spinner } from "@sanity/ui";
import { EditIcon, AddIcon, EarthGlobeIcon } from "@sanity/icons";
import { useClient } from "sanity";

interface Translation {
  _id: string;
  title: string;
  language: string;
  slug: { current: string };
}

import { ObjectInputProps, ObjectSchemaType } from "sanity";

type TranslationManagerInputProps = ObjectInputProps<Record<string, any>, ObjectSchemaType>;

export default function TranslationManager(props: TranslationManagerInputProps) {
  // In Sanity custom input, props.value è il valore del campo, props.parent è il documento intero
  const { value, parent } = props as any;
  const document = parent || {};
  // onEdit non è più passato come prop, ma può essere gestito internamente se serve
  const client = useClient({ apiVersion: "2023-05-03" });
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!document?.contentId) return;

    setLoading(true);
    const query = `*[_type == "${document._type}" && contentId == $contentId && _id != $currentId] {
      _id,
      title,
      language,
      slug
    }`;

    client.fetch(query, {
      contentId: document.contentId,
      currentId: document._id?.replace(/^drafts\./, "")
    })
    .then(setTranslations)
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [client, document?.contentId, document?._id, document?._type]);

  if (!document?.contentId) {
    return (
      <Card padding={3} radius={2} tone="caution">
        <Text size={1}>
          Salva il documento con un Content ID per gestire le traduzioni
        </Text>
      </Card>
    );
  }

  const handleEditTranslation = (translationId: string) => {
    // Apre il documento nella nuova tab dello studio
    const editUrl = `/studio/structure/orderable-${document._type};${translationId}`;
    window.open(editUrl, '_blank');
  };

  const handleCreateTranslation = (targetLanguage: string) => {
    // Crea un nuovo documento con i campi pre-compilati
    const newDocUrl = `/studio/structure/orderable-${document._type};new?template=multilang&contentId=${document.contentId}&language=${targetLanguage}`;
    window.open(newDocUrl, '_blank');
  };

  const availableLanguages = [
    { code: 'it', label: 'Italiano' },
    { code: 'en', label: 'English' }
  ];

  const existingLanguages = new Set([
    document.language,
    ...translations.map(t => t.language)
  ]);

  const missingLanguages = availableLanguages.filter(
    lang => !existingLanguages.has(lang.code)
  );

  return (
    <Card padding={3} radius={2}>
      <Flex direction="column" gap={3}>
        <Flex align="center" gap={2}>
          <EarthGlobeIcon />
          <Text weight="semibold">Traduzioni disponibili</Text>
        </Flex>

        {loading ? (
          <Flex justify="center" padding={3}>
            <Spinner />
          </Flex>
        ) : (
          <Flex direction="column" gap={2}>
            {/* Documento corrente */}
            <Card padding={3} radius={1} tone="primary">
              <Flex align="center" justify="space-between">
                <Flex align="center" gap={2}>
                  <Badge tone="primary">{document.language?.toUpperCase()}</Badge>
                  <Text size={1} weight="medium">Documento corrente</Text>
                </Flex>
                <Button text="Attuale" mode="ghost" disabled />
              </Flex>
            </Card>

            {/* Traduzioni esistenti */}
            {translations.map((translation) => (
              <Card key={translation._id} padding={3} radius={1}>
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={2}>
                    <Badge>{translation.language.toUpperCase()}</Badge>
                    <Text size={1}>{translation.title}</Text>
                    <Text size={1} muted>/{translation.slug?.current}</Text>
                  </Flex>
                  <Button
                    text="Modifica"
                    icon={EditIcon}
                    mode="ghost"
                    onClick={() => handleEditTranslation(translation._id)}
                  />
                </Flex>
              </Card>
            ))}

            {/* Lingue mancanti */}
            {missingLanguages.map((lang) => (
              <Card key={lang.code} padding={3} radius={1} tone="transparent">
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={2}>
                    <Badge tone="default">{lang.code.toUpperCase()}</Badge>
                    <Text size={1} muted>Traduzione non disponibile</Text>
                  </Flex>
                  <Button
                    text="Crea"
                    icon={AddIcon}
                    mode="ghost"
                    tone="positive"
                    onClick={() => handleCreateTranslation(lang.code)}
                  />
                </Flex>
              </Card>
            ))}
          </Flex>
        )}
      </Flex>
    </Card>
  );
}