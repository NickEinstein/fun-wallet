/**
 * Returns a Tailwind text color class based on the status string.
 * @param {string} status - The status text to check (e.g. 'In stock', 'Low stock', 'Out of stock').
 * @returns {string} Tailwind text color class
 */
export function getStatusTextColor(status) {
  if (!status) return 'text-gray-400'
  const normalized = status.replaceAll('_', ' ').replaceAll('-', ' ').toLowerCase()
  // Green: available, ongoingclocked in
  if (['in stock', 'available', 'ongoing', 'active', 'accepted','successful', 'active','clocked in','live','past'].includes(normalized))
    return 'text-green-600'
  if (['pending'].includes(normalized)) return 'text-yellow-500'
  if (['ready'].includes(normalized)) return 'text-[#4CAF50]'
  if (['settle'].includes(normalized)) return 'text-[#1976D2]'
  // if (['overdue'].includes(normalized)) return 'text-[#E93C3C ]'

  // Orange: low stock, no show, cooking
  if (['low stock', 'no show', 'cooking','Failed'].includes(normalized)) return 'text-[#FF9D3F]'
  // Blue: upcoming, awaiting payment
  if (['upcoming', 'awaiting payment'].includes(normalized)) return 'text-blue-600'
  // Purple: completed
  if (['completed', 'paid'].includes(normalized)) return 'text-[#747CDA]'
  // Red: out of stock, cancelled, bill unsettled
  if (['out of stock', 'cancelled', 'bill unsettled', 'declined', 'expired', 'clocked out','overdue','failed','failed'].includes(normalized))
    return 'text-red-600'
  return 'text-gray-400'
}

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalizeWords(str) {
  if (!str) return ''
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}
