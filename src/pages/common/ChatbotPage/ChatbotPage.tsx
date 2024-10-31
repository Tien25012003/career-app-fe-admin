import { deletePromptAPI, getChatBotListAPI } from '@api/services/chat-bot/chat-bot.api';
import { ChatBotREQ } from '@api/services/chat-bot/chat-bot.request';
import { ChatBotRESP } from '@api/services/chat-bot/chat-bot.response';
import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { PageHeader } from '@component/PageHeader/PageHeader';
import { TableButton } from '@component/TableButton/TableButton';
import { onError } from '@helper/error.helpers';
import { Button, Stack } from '@mantine/core';
import { IconBrandWechat, IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DATETIME_FORMAT, DateUtils } from '@util/DateUtils';
import { NotifyUtils } from '@util/NotificationUtils';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useFilter } from 'hooks/useFilter';
import useInvalidate from 'hooks/useInvalidate';
import { DataTableColumn } from 'mantine-datatable';
import { useCallback, useMemo, useState } from 'react';
import { ChatbotCreateModal } from './components';

export default function ChatbotPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { queries, hasNone, onSearch, onReset, getPaginationConfigs } = useFilter<ChatBotREQ>();

  const invalidate = useInvalidate();

  // APIS
  const { data: chatbots, isFetching: isFetchingChatBots } = useQuery({
    queryKey: [QUERY_KEYS.CHAT_BOT.LIST, queries],
    queryFn: () => getChatBotListAPI(queries),
    enabled: !hasNone,
  });

  const { mutate: deletePromptMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deletePromptAPI(id),
    onSuccess: () => {
      invalidate({
        queryKey: [QUERY_KEYS.CHAT_BOT.LIST],
      });
      NotifyUtils.success('Xoá câu hỏi thành công');
    },
    onError,
  });

  // METHODS
  const onDelete = useCallback(
    (id: string) => {
      deletePromptMutation(id);
    },
    [deletePromptMutation],
  );

  const columns = useMemo<DataTableColumn<ChatBotRESP>[]>(
    () => [
      {
        accessor: '',
        title: 'STT',
        textAlign: 'center',
        render: (_, index) => <div>{index + 1}</div>,
      },
      {
        accessor: '_id',
        title: 'ID',
        // width: 600,
        textAlign: 'center',
      },
      {
        accessor: 'question',
        title: 'Câu hỏi',
        width: 400,
      },
      {
        accessor: 'answer',
        title: 'Câu trả lời',
        width: 400,
      },
      {
        accessor: 'keywords',
        title: 'Từ khoá',
        width: 100,
      },
      {
        accessor: 'creator',
        title: 'Người tạo',
      },
      {
        accessor: 'createdAt',
        title: 'Ngày tạo',
        width: 200,
        render: (val) => DateUtils.fDate(new Date(val.createdAt), DATETIME_FORMAT),
      },
      {
        accessor: 'actions',
        title: 'Thao tác',
        textAlign: 'center',
        render: (val) => (
          <TableButton
            onEdit={() => {
              setOpenCreateModal(true);
              setSelectedId(val._id);
            }}
            onDelete={() => onDelete(val._id)}
          />
        ),
      },
    ],
    [onDelete],
  );

  return (
    <Stack my='1rem' mx='1rem'>
      <PageHeader
        title='Chat bot'
        leftSection={<IconBrandWechat />}
        rightSection={
          <Button leftSection={<IconPlus size={'1.125rem'} />} onClick={() => setOpenCreateModal(true)}>
            Thêm mới
          </Button>
        }
      />
      <AppSearch onSearch={(val) => onSearch({ question: val })} onReset={onReset} />
      <AppTable
        isLoading={isFetchingChatBots || isDeleting}
        data={chatbots?.data || []}
        paginationConfigs={getPaginationConfigs(chatbots?.pagination?.totalPages, chatbots?.pagination?.totalCounts)}
        columns={columns}
      />
      <ChatbotCreateModal
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(!openCreateModal);
          if (selectedId !== null) {
            setSelectedId(null);
          }
        }}
        selectedId={selectedId}
      />
    </Stack>
  );
}
