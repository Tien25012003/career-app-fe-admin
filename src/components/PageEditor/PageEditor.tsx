import { Box, Input, InputWrapperProps, ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
interface PageEditorProps extends InputWrapperProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  sticky?: boolean;
  stickyOffset?: number;
  editAble?: boolean;
  initialValue?: string;
}
export function PageEditor({ value = '', initialValue, onChange, error, sticky, stickyOffset, editAble = true, ...rest }: PageEditorProps) {
  const theme = useMantineTheme();
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight, TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: value,
    editable: editAble,
    onUpdate: (props) => onChange && onChange(props.editor.getHTML()),
  });
  useEffect(() => {
    if (initialValue) {
      editor?.commands?.setContent(initialValue);
    }
  }, [initialValue]);
  return (
    <Input.Wrapper error={error} {...rest}>
      <Box
        style={{
          cursor: editAble ? 'text' : 'not-allowed',
          opacity: !editAble ? 0.5 : 1,
          pointerEvents: !editAble ? 'none' : 'auto',
        }}
      >
        <RichTextEditor
          editor={editor}
          mb='0.35rem'
          styles={{
            root: {
              borderColor: error && theme.colors.red[theme.colorScheme === 'dark' ? 8 : 6],
            },
            toolbar: {
              gap: theme.spacing.xs,
              padding: theme.spacing.xs,
            },
            content: {
              backgroundColor: !editAble ? '#f6f8fa' : theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
              minHeight: '3.55rem',
            },
          }}
        >
          <RichTextEditor.Toolbar sticky={sticky} stickyOffset={stickyOffset}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <ScrollArea>
            <Stack mah={300}>
              <RichTextEditor.Content />
            </Stack>
          </ScrollArea>
        </RichTextEditor>
      </Box>
    </Input.Wrapper>
  );
}
