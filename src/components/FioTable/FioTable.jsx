import React from 'react';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

function FioTable({ tableData, setTableData, setShowTable, certificateRef, textBlocks, setTextBlocks }) {

    const addRow = () => {
        if (tableData.length < 10) {
            setTableData([...tableData, { lastName: '', firstName: '', middleName: '' }]);
        }
    };

    const updateRow = (index, updatedRow) => {
        const updatedData = [...tableData];
        updatedData[index] = updatedRow;
        setTableData(updatedData);
    };

    const deleteRow = (index) => {
        const updatedData = [...tableData];
        updatedData.splice(index, 1);
        setTableData(updatedData);
    };

    const handleSaveAllPDFs = async () => {
        const scale = 3;
        const pdf = new JsPDF();

        for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
            const row = tableData[rowIndex];
            if (row) {
                const fio = `${row.lastName} ${row.firstName} ${row.middleName}`;

                // Создаем копию textBlocks для текущей итерации и обновляем %фио на данные ФИО
                const updatedTextBlocks = textBlocks.map(block => ({
                    ...block,
                    text: block.text === '%фио' ? fio : block.text,
                }));

                // Создаем временный canvas для текущей строки
                const tempCanvas = await new Promise(resolve => {
                    setTextBlocks(updatedTextBlocks);
                    setTimeout(async () => {
                        const canvas = await html2canvas(certificateRef.current, { scale });
                        resolve(canvas);
                    }, 1000);
                });

                // Получаем base64 код изображения
                const imgData = tempCanvas.toDataURL('image/png').split(',')[1];

                // Добавляем изображение с обновленными textBlocks в PDF
                if (rowIndex !== 0) {
                    pdf.addPage();
                }
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 300, '', 'FAST');
            }
        }

        // Сохраняем объединенный PDF файл
        pdf.save('certificates.pdf');
    };

    return (
        <div className="table-container">
            <table className="fio-table">
                <thead>
                <tr>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>
                            <input
                                type="text"
                                value={row.lastName}
                                onChange={(e) =>
                                    updateRow(rowIndex, {
                                        ...row,
                                        lastName: e.target.value,
                                    })
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.firstName}
                                onChange={(e) =>
                                    updateRow(rowIndex, {
                                        ...row,
                                        firstName: e.target.value,
                                    })
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.middleName}
                                onChange={(e) =>
                                    updateRow(rowIndex, {
                                        ...row,
                                        middleName: e.target.value,
                                    })
                                }
                            />
                        </td>
                        <td>
                            <button onClick={() => deleteRow(rowIndex)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={addRow}>Добавить строку</button>
            <button onClick={handleSaveAllPDFs}>Создать все PDF</button>
            <button onClick={() => setShowTable(false)}>Закрыть</button>
        </div>
    );
}

export default FioTable;
