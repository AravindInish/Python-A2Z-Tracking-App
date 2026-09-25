import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { parseExcelFile, ParseResult } from '../utils/excelParser';
import { Topic, ExcelColumnMapping } from '../types/tracker';

interface ExcelUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (topics: Topic[], sourceFileName: string) => void;
}

export const ExcelUploadModal: React.FC<ExcelUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [customMapping, setCustomMapping] = useState<ExcelColumnMapping>({});
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = async (selectedFile: File, sheetName?: string, mapping?: ExcelColumnMapping) => {
    setLoading(true);
    setError(null);
    try {
      const result = await parseExcelFile(selectedFile, sheetName, mapping);
      setParseResult(result);
      setSelectedSheet(result.selectedSheet);
      setCustomMapping(result.mapping);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to parse Excel file.');
      setParseResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      handleFileProcess(f);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      setFile(f);
      handleFileProcess(f);
    }
  };

  const handleSheetChange = (sheet: string) => {
    if (!file) return;
    setSelectedSheet(sheet);
    handleFileProcess(file, sheet, customMapping);
  };

  const handleMappingChange = (field: keyof ExcelColumnMapping, colName: string) => {
    const updated = { ...customMapping, [field]: colName || undefined };
    setCustomMapping(updated);
    if (file) {
      handleFileProcess(file, selectedSheet, updated);
    }
  };

  const handleApply = () => {
    if (!parseResult || parseResult.topics.length === 0) return;
    onUploadSuccess(parseResult.topics, file?.name || 'Spreadsheet');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Upload Tracker Spreadsheet
              </h2>
              <p className="text-xs text-slate-500">
                Load your custom Excel (.xlsx, .xls) or CSV study sheet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto space-y-5 flex-1 text-sm">
          {/* File Dropzone */}
          {!parseResult ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Click to browse or drag and drop your spreadsheet here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports Microsoft Excel (.xlsx, .xls) and CSV (.csv)
                  </p>
                </div>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-mono text-slate-600 shadow-2xs">
                  Source of truth preserved • Order & structure retained
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Info Banner */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FileSpreadsheet className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-blue-950 truncate">
                      {file?.name}
                    </p>
                    <p className="text-[11px] text-blue-700">
                      {parseResult.totalTopics} topics detected across {parseResult.modulesFound.length} modules
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFile(null);
                    setParseResult(null);
                  }}
                  className="px-2.5 py-1 text-xs bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0"
                >
                  Change File
                </button>
              </div>

              {/* Sheet selector if workbook has multiple sheets */}
              {parseResult.sheetNames.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">Worksheet:</span>
                  <select
                    value={selectedSheet}
                    onChange={(e) => handleSheetChange(e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800"
                  >
                    {parseResult.sheetNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Column Mapping Review */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Column Mapping Verification
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Auto-detected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Topic / Problem Name *</label>
                    <select
                      value={customMapping.topicCol || ''}
                      onChange={(e) => handleMappingChange('topicCol', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      {parseResult.detectedHeaders.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Module / Category</label>
                    <select
                      value={customMapping.moduleCol || ''}
                      onChange={(e) => handleMappingChange('moduleCol', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      <option value="">-- None / Default --</option>
                      {parseResult.detectedHeaders.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Sub-Module / Section</label>
                    <select
                      value={customMapping.submoduleCol || ''}
                      onChange={(e) => handleMappingChange('submoduleCol', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      <option value="">-- None / Default --</option>
                      {parseResult.detectedHeaders.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Resource URL / Link</label>
                    <select
                      value={customMapping.urlCol || ''}
                      onChange={(e) => handleMappingChange('urlCol', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      <option value="">-- None --</option>
                      {parseResult.detectedHeaders.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Status Column</label>
                    <select
                      value={customMapping.statusCol || ''}
                      onChange={(e) => handleMappingChange('statusCol', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      <option value="">-- None (Start Fresh) --</option>
                      {parseResult.detectedHeaders.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Notes Column</label>
                    <select
                      value={customMapping.notesCol || ''}
                      onChange={(e) => handleMappingChange('notesCol', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-slate-800"
                    >
                      <option value="">-- None --</option>
                      {parseResult.detectedHeaders.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Data Preview Table */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Data Preview (First 4 Rows)
                </span>
                <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white text-xs">
                  <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                      <tr>
                        <th className="px-3 py-2 text-left">#</th>
                        <th className="px-3 py-2 text-left">Module</th>
                        <th className="px-3 py-2 text-left">Submodule</th>
                        <th className="px-3 py-2 text-left">Topic</th>
                        <th className="px-3 py-2 text-left">Resource</th>
                        <th className="px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {parseResult.topics.slice(0, 4).map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/50">
                          <td className="px-3 py-1.5 font-mono text-slate-400">{t.order}</td>
                          <td className="px-3 py-1.5 font-medium text-slate-800">{t.module}</td>
                          <td className="px-3 py-1.5 text-slate-600">{t.submodule}</td>
                          <td className="px-3 py-1.5 text-slate-900 font-medium">{t.topic}</td>
                          <td className="px-3 py-1.5 text-slate-600">{t.resourceName || '-'}</td>
                          <td className="px-3 py-1.5">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Loading or Error */}
          {loading && (
            <div className="flex items-center justify-center p-6 text-slate-500 text-xs gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>Analyzing spreadsheet rows and column layout...</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-800 font-medium"
          >
            Cancel
          </button>

          {parseResult && (
            <button
              onClick={handleApply}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-2xs transition-colors"
            >
              <span>Load {parseResult.totalTopics} Topics as Source of Truth</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
