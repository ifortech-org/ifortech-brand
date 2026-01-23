import { defineType } from "sanity";
import TranslationManager from "../../components/translationManager";

export default defineType({
  name: "translationManager",
  title: "Translation Manager", 
  type: "object",
  fields: [
    {
      name: "placeholder",
      type: "string",
      hidden: true,
    }
  ],
  components: {
    input: TranslationManager,
  },
});