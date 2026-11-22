import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path/win32';

export class JsonUtils {
    readDataFromCSV(filePath: string): Record<string, string>[] {
        if (!fs.existsSync(filePath)) {
            throw new Error(`CSV file not found: ${filePath}`);
        }

        const content = fs.readFileSync(filePath, "utf8");

        const parsedRows = parse(content, {
            columns: true, // Dòng đầu tiên là header
            skip_empty_lines: true, // Bỏ qua dòng trống
            trim: true, // Xóa khoảng trắng đầu/cuối
        }) as Array<Record<string, string | undefined>>;

        return parsedRows.map(
            (row) =>
            Object.fromEntries(
                Object.entries(row).map(([key, value]) => [key, value ?? ""]),
            ) as Record<string, string>,
        );
    }

/**
 * Copy the original Json file to new Json
 * @param sourcePath: testdata/{serviceFolder}/{fileName}.json
 * @param destinationPath: testdata/{serviceFolder}/{fileName = File gốc + copy}.json
 */
copyFile(sourcePath: string, destinationPath: string): void {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  fs.copyFileSync(sourcePath, destinationPath);
}

changeValueByKey(json: string, key: string, value: string): string {
    let jsonString: string = "";
    const jsonObject = JSON.parse(json);
    if (jsonObject.hasOwnProperty(key)) {
        if (value === "missing") {
            delete jsonObject[key];
        } else if (value === "") {
            jsonObject[key] = "";
        } else if (value === "null") {
            jsonObject[key] = null;
        } else {
            jsonObject[key] = value;
        }
    } else {
        throw new Error(`Key "${key}" not found in the JSON object.`);
    }
    jsonString = JSON.stringify(jsonObject);
    return jsonString;
}

readDataFromJson(filePath: string): string {
    if (!fs.existsSync(filePath)) {
        throw new Error(`JSON file not found: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, "utf8");
    return content;
}

buildDataPath(dataFolder: string, serviceFolder: string, fileName: string): string {
    const filePath = path.join(__dirname, dataFolder, serviceFolder, fileName);
    return filePath;
}
}
