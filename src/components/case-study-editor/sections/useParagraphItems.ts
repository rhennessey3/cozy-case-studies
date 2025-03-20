
interface ParagraphItem {
  title: string;
  content: string;
  titleField: string;
  contentField: string;
}

interface ParagraphFormState {
  fourPara1Title?: string;
  fourPara1Content?: string;
  fourPara2Title?: string;
  fourPara2Content?: string;
  fourPara3Title?: string;
  fourPara3Content?: string;
  fourPara4Title?: string;
  fourPara4Content?: string;
}

export const useParagraphItems = (form: ParagraphFormState) => {
  // Prepare paragraph items
  const paragraphItems: ParagraphItem[] = [
    {
      title: form.fourPara1Title || '',
      content: form.fourPara1Content || '',
      titleField: 'fourPara1Title',
      contentField: 'fourPara1Content',
    },
    {
      title: form.fourPara2Title || '',
      content: form.fourPara2Content || '',
      titleField: 'fourPara2Title',
      contentField: 'fourPara2Content',
    },
    {
      title: form.fourPara3Title || '',
      content: form.fourPara3Content || '',
      titleField: 'fourPara3Title',
      contentField: 'fourPara3Content',
    },
    {
      title: form.fourPara4Title || '',
      content: form.fourPara4Content || '',
      titleField: 'fourPara4Title',
      contentField: 'fourPara4Content',
    }
  ];

  return { paragraphItems };
};
