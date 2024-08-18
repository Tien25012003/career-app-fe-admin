import { Table, Checkbox, Image } from '@mantine/core';
import { useState } from 'react';

const dictionaryDummyData = [
  {
    name: 'Ngành Y Đa Khoa',
    image:
      'https://thongtintuyensinh.net/wp-content/uploads/2019/09/logo-y-te-suc-khoe-benh-vien.jpg',
    subjects: 'Toán, Hoá, Sinh',
    pros: 'Tiềm năng nghề nghiệp: Ngành Y Đa Khoa mang lại nhiều cơ hội việc làm ổn định và phát triển, với mức lương hấp dẫn và khả năng thăng tiến trong sự nghiệp.\nKiến thức đa dạng: Bác sĩ y đa khoa được đào tạo với kiến thức rộng và sâu về nhiều lĩnh vực y học khác nhau như nội khoa, ngoại khoa, sản khoa, phẫu thuật... Điều này mang lại cơ hội cho họ phát triển và chuyên sâu trong lĩnh vực mà họ đam mê.\nTiếp xúc với người dân: Bác sĩ y đa khoa thường tiếp xúc trực tiếp với bệnh nhân, tạo cơ hội giao tiếp và tương tác xã hội, giúp họ hiểu sâu hơn về cộng đồng và con người, cũng như cảm thấy hài lòng khi giúp đỡ người khác.',
    cons: 'Áp lực công việc: Bác sĩ y đa khoa thường phải đối mặt với áp lực công việc cao, đặc biệt là trong các bệnh viện lớn hoặc khu vực có nhu cầu chăm sóc sức khỏe lớn. Áp lực này có thể ảnh hưởng đến sức khỏe và tinh thần của họ.\nThời gian làm việc dài: Bác sĩ y đa khoa thường phải làm việc trong các ca làm việc dài, thường xuyên làm việc vào buổi tối, cuối tuần, ngày lễ, và thậm chí làm thêm giờ để đảm bảo chăm sóc cho bệnh nhân khi cần thiết. Điều này có thể gây ra sự mất cân bằng giữa công việc và cuộc sống cá nhân.\nStress và trách nhiệm: Bác sĩ y đa khoa thường phải đối mặt với tình huống khẩn cấp và trách nhiệm lớn đối với sức khỏe và tính mạng của bệnh nhân. Cảm giác lo lắng và căng thẳng có thể là một phần không thể tránh khỏi trong nghề này.',
    _id: '6640494416a124d672325f2c',
  },
  {
    name: 'Nha Khoa',
    image:
      'https://detec.vn/wp-content/uploads/2020/11/Nhung-dieu-ban-chua-biet-ve-co-hoi-lam-viec-trong-nganh-nha-khoa-2.jpg',
    subjects: 'Toán, Hoá, Sinh',
    pros: 'Cơ hội nghề nghiệp: Ngành Nha Khoa mang lại nhiều cơ hội việc làm cho các bác sĩ nha khoa, kỹ thuật viên nha khoa và nhân viên hỗ trợ y tế trong lĩnh vực chăm sóc và điều trị răng miệng.\nĐóng góp cho sức khỏe: Nha khoa không chỉ giúp cải thiện nụ cười và hình dáng khuôn mặt mà còn đóng vai trò quan trọng trong việc duy trì sức khỏe răng miệng, ngăn ngừa các vấn đề như sâu răng, viêm nhiễm nướu và mất răng.\nTiếp cận công nghệ tiên tiến: Ngành Nha Khoa liên tục áp dụng và phát triển các công nghệ tiên tiến trong việc chẩn đoán và điều trị, từ các kỹ thuật làm đẹp răng miệng đến việc sử dụng máy móc và thiết bị hiện đại.',
    cons: 'Chi phí điều trị cao: Một số dịch vụ trong ngành Nha Khoa, đặc biệt là các phương pháp phục hình răng hoặc chỉnh nha, thường đòi hỏi chi phí lớn, gây khó khăn cho những người không có bảo hiểm hoặc nguồn tài chính hạn chế.\nLo lắng và sợ hãi: Một số bệnh nhân có thể gặp lo lắng và sợ hãi khi đối mặt với quy trình nha khoa, đặc biệt là trong các ca phẫu thuật hoặc điều trị phức tạp.\nYêu cầu kiên nhẫn và thời gian: Một số quá trình điều trị trong ngành này có thể kéo dài và đòi hỏi sự kiên nhẫn từ bệnh nhân, đặc biệt là trong các trường hợp điều trị phức tạp hoặc điều chỉnh nha.',
    _id: '6640494416a124d672325f2d',
  },
  {
    name: 'Dược học',
    image: 'https://usth.edu.vn/wp-content/uploads/2023/08/nganh-duoc-_1.jpg',
    subjects: 'Toán, Hoá, Sinh',
    pros: 'Đóng góp cho sức khỏe cộng đồng: Ngành Dược Học đóng vai trò quan trọng trong việc nghiên cứu, phát triển và sản xuất các loại thuốc và sản phẩm dược phẩm, giúp điều trị và ngăn ngừa các bệnh tật, cải thiện chất lượng cuộc sống và đóng góp vào sức khỏe cộng đồng.\nCơ hội nghề nghiệp: Ngành Dược Học cung cấp nhiều cơ hội việc làm cho các dược sĩ, nhà nghiên cứu dược phẩm, chuyên gia kiểm định chất lượng và nhân viên bán thuốc, cũng như trong các lĩnh vực liên quan như quản lý dược phẩm và giáo dục dược học.\nSự phát triển công nghệ: Công nghệ và phương pháp trong ngành Dược Học ngày càng phát triển, từ việc tạo ra các loại thuốc mới đến việc cải tiến quy trình sản xuất và điều trị, tạo ra nhiều cơ hội nghiên cứu và phát triển sản phẩm mới.',
    cons: 'Đòi hỏi kiến thức và kỹ năng chuyên môn cao: Ngành Dược Học đòi hỏi kiến thức sâu rộng về hóa học, sinh học, y học và quy trình sản xuất thuốc, cùng với kỹ năng làm việc cẩn thận và chi tiết.\nQuy định nghiêm ngặt: Sản xuất và phân phối thuốc cần phải tuân thủ các quy định và tiêu chuẩn nghiêm ngặt từ các cơ quan quản lý và y tế, đòi hỏi sự kiểm soát chất lượng và tuân thủ quy trình nghiêm ngặt.\nCạnh tranh và áp lực thị trường: Ngành Dược Học đang đối mặt với sự cạnh tranh gay gắt và áp lực từ các yếu tố như thị trường, công nghệ và quy định pháp lý, đòi hỏi sự đổi mới và tinh thần sáng tạo để tồn tại và phát triển.',
    _id: '6640494416a124d672325f2e',
  },
  {
    name: 'Tâm Lý Học',
    image: 'https://huongnghiep.hocmai.vn/wp-content/uploads/2021/12/150.png',
    subjects: 'Toán, Hoá, Sinh',
    pros: 'Hiểu biết về bản thân và người khác: Ngành Tâm Lý Học giúp con người hiểu rõ hơn về tâm lý, hành vi và tư duy của mình cũng như của người khác. Điều này giúp tạo ra một cộng đồng có sự thông cảm và tôn trọng lẫn nhau.\nỨng dụng trong nhiều lĩnh vực: Kiến thức và kỹ năng của ngành Tâm Lý Học có thể được áp dụng trong nhiều lĩnh vực như giáo dục, y tế, quản lý nhân sự, tư vấn tâm lý, tâm lý học thể thao, và tâm lý học pháp lý.\nCơ hội nghề nghiệp: Ngành Tâm Lý Học mang lại nhiều cơ hội nghề nghiệp cho những người muốn làm việc trong các vai trò như tư vấn viên tâm lý, nhà nghiên cứu, giảng viên, nhà phân tích hành vi, và nhà thiết kế chương trình giáo dục.',
    cons: 'Phân biệt giữa lý thuyết và thực tiễn: Một số người có thể gặp khó khăn trong việc áp dụng các lý thuyết tâm lý vào thực tiễn, đặc biệt là trong các tình huống phức tạp hoặc đa chiều.\nKhả năng đoán trước hạn chế: Tâm lý học không thể dự đoán hoàn toàn hành vi và phản ứng của con người vì mỗi người đều có những biến thể cá nhân độc đáo.\nCần thiết kiên nhẫn và nhạy bén: Nghiên cứu và làm việc trong ngành Tâm Lý Học đòi hỏi sự kiên nhẫn và khả năng nhận biết và hiểu biết sâu sắc về con người và xã hội.',
    _id: '6640494416a124d672325f2f',
  },
  {
    name: 'Thú Y',
    image:
      'https://png.pngtree.com/png-vector/20230808/ourlarge/pngtree-veterinarian-clipart-cartoon-veterinary-clinic-technician-with-two-pets-vector-png-image_6827906.png',
    subjects: 'Toán, Hoá, Sinh',
    pros: 'Quan trọng cho sức khỏe động vật: Thú Y đóng vai trò quan trọng trong việc chăm sóc và điều trị các loài động vật, bảo đảm sức khỏe và hetgiảm rủi ro của bệnh tật cho cả gia súc, thú cưng và động vật hoang dã.\nCơ hội nghề nghiệp: Ngành Thú Y mang lại nhiều cơ hội nghề nghiệp cho các bác sĩ thú y, kỹ thuật viên thú y, và nhân viên hỗ trợ y tế động vật.\nĐóng góp vào nông nghiệp và sản xuất thực phẩm: Thú Y đóng vai trò quan trọng trong việc bảo vệ sức khỏe của gia súc và gia cầm, giúp tăng sản lượng và chất lượng sản phẩm nông nghiệp và thực phẩm.',
    cons: 'Công việc đòi hỏi sự nhạy bén và kiên nhẫn: Chăm sóc và điều trị động vật có thể đòi hỏi sự nhạy bén và kiên nhẫn, đặc biệt khi đối mặt với các trường hợp khó chữa hoặc động vật có hành vi gặm nhấm.\nKhó khăn trong điều kiện làm việc: Công việc thú y thường diễn ra trong môi trường vật lý khác nhau, từ phòng khám đến trang trại hoặc cả vùng hoang dã, đòi hỏi sự chịu đựng và sẵn lòng làm việc dưới áp lực của thời tiết và môi trường.\nCạnh tranh và áp lực công việc: Ngành Thú Y đang đối mặt với sự cạnh tranh và áp lực từ các yếu tố như thị trường, công nghệ và các quy định pháp lý, đòi hỏi sự đổi mới và tinh thần sáng tạo để tồn tại và phát triển.',
    _id: '6640494416a124d672325f30',
  },
  {
    name: 'Y Học Cổ Truyền',
    image:
      'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/6/20/1206791/Y-Hoc-Co-Truyen.jpeg',
    subjects: 'Toán, Hoá, Sinh',
    pros: 'Lịch sử và truyền thống: Y Học Cổ Truyền có lịch sử lâu đời và truyền thống sâu sắc trong nhiều nền văn hóa trên thế giới, được phát triển và truyền bá qua nhiều thế hệ.\nSự đa dạng và linh hoạt: Y Học Cổ Truyền không chỉ chú trọng vào việc điều trị bệnh mà còn đề cao việc duy trì và cân bằng sức khỏe tổng thể của cơ thể thông qua các phương pháp như thực phẩm, thiền định và thủy tinh.\nTiếp cận tự nhiên và an toàn: Y Học Cổ Truyền thường sử dụng các loại dược liệu tự nhiên và phương pháp trị liệu như thực phâm và thảo dược, giúp giảm thiểu tác dụng phụ và tối ưu hóa quá trình phục hồi của cơ thể.',
    cons: 'Thiếu minh bạch và chứng minh khoa học: Một số phương pháp và liệu pháp trong Y Học Cổ Truyền không được chứng minh khoa học hoặc thiếu bằng chứng về hiệu quả và an toàn, dẫn đến tranh cãi và lo ngại về tính khoa học và độ an toàn của chúng.\nKhó khăn trong việc tích hợp với y học hiện đại: Y Học Cổ Truyền và y học hiện đại thường có góc nhìn và phương pháp điều trị khác nhau, đôi khi gây ra sự mâu thuẫn và khó khăn trong việc tích hợp và kết hợp các phương pháp này để điều trị bệnh tật hiệu quả.\nRủi ro về hiệu quả và an toàn: Mặc dù nhiều phương pháp trong Y Học Cổ Truyền được coi là an toàn và hiệu quả, nhưng việc sử dụng các loại dược liệu và phương pháp không đúng cách có thể gây ra rủi ro cho sức khỏe, đặc biệt là khi không được giám sát chặt chẽ bởi các chuyên gia y tế.',
    _id: '6640494416a124d672325f31',
  },
  {
    name: 'Sư phạm Sinh học',
    image:
      'https://www.schoolnetindia.com/blog/wp-content/uploads/2022/05/What-are-the-Different-Types-of-Teacher-Training-Programs.jpg',
    subjects: 'Toán, Hoá, Sinh',
    pros: 'Giáo dục về sức khỏe và môi trường: Giáo viên Sinh học đóng vai trò quan trọng trong việc giáo dục học sinh về sức khỏe, sinh học và bảo vệ môi trường. Họ giúp học sinh hiểu về quy trình sống và môi trường xung quanh, tạo ra những tư duy phê phán và giải quyết vấn đề.\nKhám phá và nghiên cứu: Giáo viên Sinh học khuyến khích học sinh khám phá và nghiên cứu về thế giới tự nhiên thông qua các thí nghiệm, quan sát và nghiên cứu thực địa. Điều này giúp nuôi dưỡng tinh thần sáng tạo và trí tò mò của học sinh.\nƯu tiên vấn đề toàn cầu: Sư phạm Sinh học thường đề xuất các chương trình giáo dục xoay quanh các vấn đề toàn cầu như biến đổi khí hậu, đa dạng sinh học, và bảo tồn môi trường, từ đó khuyến khích học sinh tham gia vào các hoạt động và dự án cộng đồng.',
    cons: 'Thách thức với sự phức tạp của ngành: Sư phạm Sinh học đòi hỏi sự hiểu biết sâu sắc về khoa học và môi trường tự nhiên, đòi hỏi sự nỗ lực và nghiên cứu liên tục từ giáo viên để cập nhật kiến thức và kỹ năng mới.\nĐối mặt với sự phân biệt về quan điểm: Trong một số trường hợp, giáo viên Sinh học có thể đối mặt với sự phản đối hoặc tranh cãi về các vấn đề nhạy cảm như giáo dục tình dục, tiến hóa, hoặc biến đổi gen.\nHạn chế về tài nguyên và trang thiết bị: Một số trường học có thể gặp khó khăn trong việc cung cấp đủ tài nguyên và trang thiết bị cho các hoạt động thí nghiệm và dạy học hiệu quả trong môn Sinh học.',
    _id: '6640494416a124d672325f32',
  },
];
export function DictionaryTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders withRowBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Tên</Table.Th>
          <Table.Th>Hình ảnh</Table.Th>
          <Table.Th>Môn thi</Table.Th>
          <Table.Th>Ưu điểm</Table.Th>
          <Table.Th>Khó khăn</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {dictionaryDummyData?.map((data, index) => {
          return (
            <Table.Tr key={index}>
              <Table.Td>
                <Checkbox
                  aria-label='Select row'
                  checked={selectedRows.includes(index)}
                  onChange={(event) =>
                    setSelectedRows(
                      event.currentTarget.checked
                        ? [...selectedRows, index]
                        : selectedRows.filter((position) => position !== index),
                    )
                  }
                />
              </Table.Td>
              <Table.Td>{data.name}</Table.Td>
              <Table.Td>
                <Image radius='md' h={100} w={100} fit='contain' src={data.image} />
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
