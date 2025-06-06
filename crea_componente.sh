#!/bin/zsh

# Usage: ./crea_componente.sh nome_componente

set -e

NOME="$1"
NOME_MAIUSC=$(echo "$NOME" | sed -E 's/(^|-)([a-z])/'"'\U\2'"'/g')

if [ -z "$NOME" ]; then
  echo "Usage: $0 nome_componente"
  exit 1
fi

# 1. Crea lo schema Sanity
mkdir -p "shared/sanity/schemas/blocks/$NOME"
cat > "shared/sanity/schemas/blocks/$NOME/$NOME.ts" <<EOF
import { defineType } from "sanity";

export default defineType({
  name: "$NOME",
  type: "object",
  title: "$NOME_MAIUSC",
  fields: [
    // Definisci i campi qui
  ],
});
EOF

# 2. Aggiungi il type in page.ts
sed -i '' "/of: \[/ s/\]/  { type: \"$NOME\" },\n        ]/" shared/sanity/schemas/documents/page.ts

# 3. Importa e aggiungi il blocco in schema.ts
IMPORT="import $NOME from \"./schemas/blocks/$NOME/$NOME\";"
grep -q "$IMPORT" shared/sanity/schema.ts || sed -i '' "1a\\
$IMPORT
" shared/sanity/schema.ts
sed -i '' "/\/\/ blocks/a\\
    $NOME,
" shared/sanity/schema.ts

# 4. (Opzionale) Crea la query
mkdir -p "shared/sanity/queries/$NOME"
cat > "shared/sanity/queries/$NOME/$NOME.ts" <<EOF
// Query GROQ per $NOME
EOF

# 5. Crea il componente React
mkdir -p "shared/components/ui/$NOME"
cat > "shared/components/ui/$NOME/$NOME.tsx" <<EOF
import React from "react";

export default function ${NOME_MAIUSC}() {
  return <div>$NOME</div>;
}
EOF

# 6. Aggiungi alla componentMap
sed -i '' "/componentMap = {/a\\
  \"$NOME\": require(\"../ui/$NOME/$NOME\").default,\n" shared/components/blocks/index.tsx

echo "Componente $NOME creato e integrato!"
